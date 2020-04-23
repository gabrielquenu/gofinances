import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const totalIncome = this.transactions.reduce(
      (accumulator, { value, type }) =>
        type === 'income' ? accumulator + value : accumulator,
      0,
    );

    const totalOutcome = this.transactions.reduce(
      (accumulator, { value, type }) =>
        type === 'outcome' ? accumulator + value : accumulator,
      0,
    );

    const balanceTransactions: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balanceTransactions;
  }

  public create({
    title,
    type,
    value,
  }: Omit<CreateTransactionDTO, 'id'>): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
