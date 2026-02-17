import { Inject, Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import type { Database as BetterSqliteDatabase } from 'better-sqlite3';


@Injectable()
export class UserService {

    constructor( @Inject("DATABASE") private db: BetterSqliteDatabase ){}

    async createUser(username: string, password: string){
        const hashedPass = await this.hashPassowrd(password)
        const qr = this.db.prepare("INSERT INTO user (username, password) VALUES (?,?)")
        qr.run(username, hashedPass)
        return "created"
    }

    async hashPassowrd(plainTxtPassword: string): Promise<string> {
        const hashedPassword = hash(plainTxtPassword, 10)
        return hashedPassword
    }
}
