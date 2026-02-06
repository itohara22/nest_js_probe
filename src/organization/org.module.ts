import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [OrgController],
  providers: [],
})
export class OrgModule {}
