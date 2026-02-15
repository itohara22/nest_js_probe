import { Provider } from "@nestjs/common"
import Database from "better-sqlite3"

export const databaseProvider: Provider = {
    provide: "DATABASE",
    useFactory: ()=>{
        const db = new Database("nina.db")
        db.pragma("foreign_keys = ON") // this is important to enforce foreign keys
        return db
    }
}

