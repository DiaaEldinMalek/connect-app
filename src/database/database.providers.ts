// database.providers.ts
import { MongoClient } from 'mongodb';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const uri = configService.get<string>('MONGODB_URI');
      const client = new MongoClient(uri);
      await client.connect();
      return client.db(); // Return the database instance
    },
  },
];