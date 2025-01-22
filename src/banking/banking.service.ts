import { Injectable, Inject, Logger, ConflictException } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class BankingService {

    constructor(@Inject('DATABASE_CONNECTION') private db: Db) { }


    async makeDeposit(userId: string, amount: number, transactionKey: string) {

        const existingDeposit = await this.db.collection('deposits').findOne({ transactionKey })
        

        if (existingDeposit && existingDeposit.userId == userId) {Logger.log(`Cancelled duplicate deposit with key ${transactionKey}`); return existingDeposit}
        else if (existingDeposit) {Logger.log(`Transaction key is not unique: ${transactionKey}`); throw new ConflictException("Transaction key invalid")}
        
        const deposit ={
            userId,
            amount,
            transactionKey,
            createdAt: new Date(),

        } 
        
        const _id = (await this.db.collection('deposits').insertOne(deposit)).insertedId
        Logger.log(`Wrote new transaction: ${transactionKey}`)
        return {_id: _id, ...deposit}
    }
}
