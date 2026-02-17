import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthUserDto } from './dto_auth/auth_user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'node:crypto';
import { LoginResponseObject } from './auth.types';
import type { Database as SqliteDB } from 'better-sqlite3';

@Injectable() // to tell nest to manage it by itself ie inversion of control
export class AuthService {
  constructor(private jwtService: JwtService, @Inject("DATABASE") private db: SqliteDB) {}

  async fetchUser(username: string): Promise<AuthUserDto | undefined> {
    // const user = new AuthUserDto(); // will lookup user from db using username
    const qr = this.db.prepare("SELECT * FROM user WHERE username = ?")
    const user = qr.get(username) as AuthUserDto
    return user;
  }

  async verifyPassword(
    hashedPasswordFromDb: string,
    plainTextPassword: string,
  ): Promise<boolean> {
    // comparing hashed password
    const isMatched = await bcrypt.compare(
      plainTextPassword,
      hashedPasswordFromDb,
    );
    return isMatched;
  }

  async createJwt(payload: { userId: number }): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  createRefreshToken(): string {
    const refreshToken = crypto.randomUUID();
    return refreshToken;
  }

  async refreshToken(
    refreshTokenFromClient: string,
  ): Promise<LoginResponseObject> {
    // look up refreshTokenFromClient in db in user table
    // we will use this user to create new jwt access token
    const userId = { userId: 1 };
    const jwt = await this.createJwt(userId);
    return { token: jwt, userId: 1, username: 'username' };
  }

  async removeToken(refreshTokenFromClient: string): Promise<boolean> {
    // delete this token in user table
    return true;
  }

  async authenticateUser(user: AuthUserDto): Promise<LoginResponseObject> {
    const userFromDb = await this.fetchUser(user.username);
    if(!userFromDb){
        throw new BadRequestException('Invalid username or passoword');
    }
    const isCorrect = await this.verifyPassword(
      userFromDb.password,
      user.password,
    );
    if (isCorrect) {
      const userId = { userId: 1 };
      const jwt = await this.createJwt(userId);
      const refreshToken = this.createRefreshToken();
      // save refreshToken in db for user
      return { token: jwt, userId: 1, username: userFromDb?.username || '' };
    }
    throw new BadRequestException('Invalid username or passoword');
  }

  async logoutUser(): Promise<string> {
    const isDeleted = await this.removeToken('sadas');
    // check isDeleted and return appropriate response
    return 'logout';
  }
}
