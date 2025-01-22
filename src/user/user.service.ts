import { Injectable, Inject, Logger, ConflictException, BadRequestException } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) { }

  async validateUserData(username: string, password: string, name: string) {
    const userMinLength = 3
    const passMinLength = 8

    if (!name) throw new BadRequestException('Name is required');
    if (!username || username.length < userMinLength) throw new BadRequestException(`Username must be at least ${userMinLength} characters long`);
    if (!password || password.length < passMinLength) throw new BadRequestException(`Password must be at least ${passMinLength} characters long`);
    
    if (await this.findByUsername(username)) { throw new ConflictException("Username already exists") }

  }

  async findById(id: string) {
    return this.db.collection('users').findOne({ _id: new ObjectId(id) });
  }

  // Find a user by their username
  async findByUsername(username: string) {
    Logger.log(`Searching for user with username: ${username}`)
    return this.db.collection('users').findOne({ username });
  }

  // Create a new user (already implemented)
  async createUser(username: string, password: string, name: string) {

    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await this.db.collection('users').insertOne({
      username,
      hashedPassword,
      name,
      createdAt: new Date(),
    });
    Logger.log(`Created user: ${result.insertedId}`)
    return result.insertedId;
  }
}