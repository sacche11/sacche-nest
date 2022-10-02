import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBookDto } from 'src/dtos/create-book.dto';
import { Book, BookIncludes } from 'src/entities/book.entity';

import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(dto);
    await this.bookRepository.save(newBook);
    return newBook;
  }

  async edit(dto: CreateBookDto, bookId: number): Promise<Book> {
    const book = await this.getBookOrFail(bookId);
    const editedBook = this.bookRepository.merge(book, dto);
    await this.bookRepository.save(editedBook);
    return editedBook;
  }

  async delete(bookId: number): Promise<void> {
    const book = await this.getBookOrFail(bookId);
    await this.bookRepository.remove(book);
  }

  async get(id: number, includes?: BookIncludes[]): Promise<Book> {
    const book: Book | null = await this.bookRepository.findOne({
      where: {
        id,
      },
      relations: {
        owners: includes?.includes(BookIncludes.Owners),
      },
    });

    if (!book) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  private async getBookOrFail(id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({
      id,
    });

    if (!book) {
      throw new HttpException(
        `A book with id ${id} does not exists`,
        HttpStatus.NOT_FOUND,
      );
    }

    return book;
  }
}
