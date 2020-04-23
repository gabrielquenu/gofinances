import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  type: 'income' | 'outcome';
  value: number;
  title: string;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = await getCustomRepository(
      TransactionsRepository,
    );

    const categoryRepository = await getRepository(Category);

    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && total - value < 0) {
      throw new AppError('There is no funds.');
    }

    const checkCategoryExists = await categoryRepository.findOne({
      title: category,
    });

    if (checkCategoryExists) {
      const transaction = await transactionsRepository.create({
        title,
        value,
        type,
        category_id: checkCategoryExists.id,
      });

      await transactionsRepository.save(transaction);
      return transaction;
    }
    const newCategory = await categoryRepository.create({
      title: category,
    });

    await categoryRepository.save(newCategory);

    const transaction = await transactionsRepository.create({
      title,
      value,
      type,
      category_id: newCategory.id,
    });
    await transactionsRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
