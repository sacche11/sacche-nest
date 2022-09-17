import { Book } from 'src/entities/book.entity';
import { DataSource } from 'typeorm';

export const bookProviders = [
  {
    provide: 'BOOK_REPOSITORY',
    useFactory: function (dataSource: DataSource) {
      return dataSource.getRepository(Book);
    },
    inject: ['DATA_SOURCE'],
  },
];
