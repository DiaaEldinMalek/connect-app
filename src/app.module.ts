import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BankingModule } from './banking/banking.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, AuthModule, BankingModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
