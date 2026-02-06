import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { OrgModule } from './organization/org.module';

@Module({
  imports: [CatsModule, AuthModule, OrgModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
