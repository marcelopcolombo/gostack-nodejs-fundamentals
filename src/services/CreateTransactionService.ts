import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome',
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    const transaction = new Transaction({ title, value, type });

    if(type === 'outcome'){
      const balance = this.transactionsRepository.getBalance();
      if(balance.total - value < 0){
        throw Error('Not enough balance.');
      }
    }

    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
