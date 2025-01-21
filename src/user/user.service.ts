// user/user.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async createUser(username: string, password: string) {
    const result = await this.db.collection('users').insertOne({
      username,
      password, // to be encrypted
      createdAt: new Date(),
    });
    return result.insertedId;
  }
}