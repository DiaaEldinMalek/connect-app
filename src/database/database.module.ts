// database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.providers';

@Module({
  imports: [ConfigModule.forRoot()], // Load environment variables
  providers: [...databaseProviders],
  exports: [...databaseProviders], // Export the database provider
})
export class DatabaseModule {}