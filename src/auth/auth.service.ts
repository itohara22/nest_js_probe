import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthUserDto } from './dto_auth/auth_user.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'
import * as crypto from "node:crypto"

@Injectable() // to tell nest to manage it by itself ie inversion of control
export class AuthService {

      constructor(private jwtService: JwtService){}

      fetchUser(username: string): AuthUserDto {
            const user = new AuthUserDto(); // will lookup user from db using username
            user.username = username;
            return user;
      }

      async verifyPassword(hashedPasswordFromDb: string, plainTextPassword: string): Promise<boolean>{
            // comparing hashed password
            const isMatched = await bcrypt.compare(plainTextPassword, hashedPasswordFromDb);
            return isMatched;
      }

      async createJwt(payload:{userId:number}): Promise<string> {
            const token = await this.jwtService.signAsync(payload);
            return token;
      }

       createRefreshToken():string {
             const refreshToken = crypto.randomUUID();
             return refreshToken;
      }

      refreshToken():string {
            return "refresh";
      }

      removeToken(): string{
            return "removes";
      }

      async authenticateUser(user: AuthUserDto ): Promise<{token:string; userId:number; username:string}> {
          const userFromDb = this.fetchUser(user.username)
          const isCorrect =  await this.verifyPassword(userFromDb.password,user.password)
          if (isCorrect) {
              const userId = {userId:1}
              const  jwt = await this.createJwt(userId);
              const refreshToken = this.createRefreshToken()
              // save refreshToken in db for user
              return {token: jwt, userId:1, username: userFromDb.username};
          }
          throw new BadRequestException("Invalid username or passoword")
      }

      logoutUser():string {
            return this.removeToken();
      }

}
