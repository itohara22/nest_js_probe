import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthUserDto } from './dto_auth/auth_user.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'

@Injectable() // to tell nest to manage it by itself ie inversion of control
export class AuthService {

      constructor(private jwtService: JwtService){}

      fetchUser(username: string): AuthUserDto {
            const user = new AuthUserDto() // will lookup user from db using username
            user.username = username
            return user;
      }

      async verifyPassword(hashedPasswordFromDb: string, plainTextPassword: string): Promise<boolean>{
            // comparing hashed password
            const isMatched = await bcrypt.compare(plainTextPassword, hashedPasswordFromDb)
            return isMatched
      }

      async createToken(payload:{userId:number}): Promise<string> {
            const token = await this.jwtService.signAsync(payload)
            return token;
      }

      refreshToken():string {
            return "refresh";
      }

      removeToken(): string{
            return "removes";
      }

      async authenticateUser(user: AuthUserDto ): Promise<string> {
          const userFromDb = this.fetchUser(user.username)
          const isCorrect =  await this.verifyPassword(userFromDb.password,user.password)
          if (isCorrect) {
              const  token = await this.createToken()
              return token;
          }
          throw new BadRequestException("Invalid username or passoword")
      }

      logoutUser():string {
            return this.removeToken();
      }

}
