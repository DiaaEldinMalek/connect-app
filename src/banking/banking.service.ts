import { Injectable, Inject, Logger, ConflictException } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class BankingService {

    constructor(@Inject('DATABASE_CONNECTION') private db: Db) { }


    async makeDeposit(userId: string, amount: number, transactionKey: string) {

        const existingDeposit = await this.db.collection('deposits').findOne({ transactionKey })

        if (existingDeposit) {return existingDeposit}
        
        const deposit ={
            userId,
            amount,
            transactionKey,
            createdAt: new Date(),

        }
        
        const result = this.db.collection('deposits').insertOne(deposit)
        return {_id: (await result).insertedId, ...deposit}
    }
}
