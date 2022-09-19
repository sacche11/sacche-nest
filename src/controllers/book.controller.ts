import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';

import { Book, BookIncludes } from 'src/entities/book.entity';
import { ParseEnumArrayPipe } from 'src/pipes/parse-enum-array.pipe';
import { BookService } from 'src/services/book.service';

@Controller('books')
@ApiTags('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @ApiOkResponse({ type: Book, isArray: true, description: 'Book List' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':bookId')
  @ApiOkResponse({ type: Book, description: 'Book Found' })
  @ApiNotFoundResponse({ description: 'Book Not Found' })
  @ApiNotAcceptableResponse({ description: 'Not Acceptable' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  @ApiQuery({
    name: 'includes',
    enum: BookIncludes,
    isArray: true,
    required: false,
  })
  async getBook(
    @Param(
      'bookId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    bookId: number,
    @Query(
      'includes',
      new ParseArrayPipe({ optional: true }),
      new ParseEnumArrayPipe(BookIncludes),
    )
    includes?: BookIncludes[],
  ): Promise<Book> {
    return this.bookService.get(bookId, includes);
  }
}
