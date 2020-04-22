import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income: number = 0;
    let outcome: number = 0;
    let total: number = 0;

    this.transactions.forEach( t => {
      (t.type === 'income') ? income += t.value : outcome += t.value;
    });

    total = income - outcome;
    return { income, outcome, total };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
