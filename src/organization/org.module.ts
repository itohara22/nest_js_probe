import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { AuthModule } from '../auth/auth.module';
import { OrgService } from './org.service';

@Module({
  imports: [AuthModule],
  controllers: [OrgController],
  providers: [OrgService],
})
export class OrgModule {}
