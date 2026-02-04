import { Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard} from '../auth/auth.guard'

@Controller('org')
export class OrgController {

      constructor(){}

      @UseGuards(AuthGuard)
      @Post('add')
      async createOrg(): Promise<string> {
           return "created" 
      }
}
