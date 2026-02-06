import { Controller,  UseGuards, Body, Post, Request, Get, Param } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { OrgService } from './org.service';
import { CreateOrgDto } from './orgDto/org.dto';
import { Org } from './interface/org.interface';

@Controller('org')
export class OrgController {
  constructor( private orgService: OrgService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createOrg( @Body() orgFromClient: CreateOrgDto, @Request() req ) {
      return await this.orgService.createOrg(orgFromClient, req.user.userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getOrgs( @Request() req ){
      return await this.orgService.findOrgsForUser(req.user.userId);
  }

  @UseGuards(AuthGuard)
  @Get(':orgId')
  async getOrgDetails( @Param('orgId') orgId: number, @Request() req ): Promise<Org>{ // TODO: need to implement pipes for type validations
    return await this.orgService.orgDetails(orgId, req.user.userId);
  }

  @UseGuards(AuthGuard)
  @Get(':orgId/expenses')
  async getOrgExpense( @Param('orgId') orgId: number, @Request() req ): Promise<string> {
      return await this.orgService.orgExpenses(orgId, req.user.userId)
  }

}

