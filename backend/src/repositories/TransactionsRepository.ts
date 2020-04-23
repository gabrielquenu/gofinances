import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const balancedValues: Balance = { income: 0, outcome: 0, total: 0 };

    const { sum: income } = await getRepository(Transaction)
      .createQueryBuilder('transaction')
      .select('SUM(transaction.value)')
      .where('transaction.type = :type', { type: 'income' })
      .getRawOne();

    if (income === null) {
      balancedValues.income = 0;
    } else {
      balancedValues.income = income;
    }

    const { sum: outcome } = await getRepository(Transaction)
      .createQueryBuilder('transaction')
      .select('SUM(transaction.value)')
      .where('transaction.type = :type', { type: 'outcome' })
      .getRawOne();

    if (outcome === null) {
      balancedValues.outcome = 0;
    } else {
      balancedValues.outcome = outcome;
    }

    balancedValues.total = balancedValues.income - balancedValues.outcome;

    return balancedValues;
  }
}

export default TransactionsRepository;
