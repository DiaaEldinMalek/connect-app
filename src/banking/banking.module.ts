import { Module } from '@nestjs/common';
import { BankingService } from './banking.service';
import { BankingController } from './banking.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [BankingService],
  controllers: [BankingController],
})
export class BankingModule { }
