import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { Book } from 'src/entities/book.entity';
import { BookService } from 'src/services/book.service';

@Controller('books') //??
@ApiTags('books')
export class BookController {
  constructor(private bookService: BookService) { }

  @Get()
  @ApiOkResponse({ type: Book, isArray: true, description: 'Book List' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':bookId') // new variable crated?
  @ApiOkResponse({ type: Book, description: 'Book Found' })
  @ApiNotFoundResponse({ description: 'Book Not Found' })
  @ApiNotAcceptableResponse({ description: 'Not Acceptable' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  async getBook(
    @Param(
      'bookId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    bookId: number,
  ): Promise<Book> {
    return this.bookService.get(bookId);
  }
}
