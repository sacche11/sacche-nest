import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Book } from 'src/entities/book.entity';

import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: Repository<Book>,
  ) { }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async get(id: number): Promise<Book> {
    const book: Book | null = await this.bookRepository.findOneBy({
      id,
    });

    if (!book) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return book;
  }
}
