import { Controller, Post, Body, UseGuards, Req, Headers, BadRequestException, Logger } from '@nestjs/common';
import { BankingService } from './banking.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('banking')
export class BankingController {
    constructor(private readonly bankingService: BankingService) {}


    @Post('deposit')
    @UseGuards(AuthGuard('jwt')) // Automatically validates JWT
    async deposit(@Body('amount') amount: number,
                @Headers('transaction-key') transactionKey:  string,
                @Req() req,
            )
            {
                if (!transactionKey) {throw new BadRequestException("Transaction-Key header is required")};
                if (!amount || amount < 0 ||  typeof amount !== 'number') {throw new BadRequestException('Invalid deposit amount');}
                const userId = req.user._id;

                return this.bankingService.makeDeposit(userId, amount, transactionKey)
            }

}
