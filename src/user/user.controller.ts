import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./user.dto/CreateUser.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

    constructor( private userService: UserService ){}

    @Post()
    async registeUse( @Body() user: CreateUserDto): Promise<string> {
        return this.userService.createUser(user.username, user.password)
    }
    
}
