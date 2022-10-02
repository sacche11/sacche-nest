import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { CreateBookDto } from 'src/dtos/create-book.dto';
import { EditBookDto } from 'src/dtos/edit-book.dto';
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

  @Post()
  @ApiOkResponse({ type: Book, description: 'Create Book' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Patch(':bookId')
  @ApiOkResponse({ type: Book, description: 'Book Edited' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Book Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  async editBook(
    @Param(
      'bookId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    bookId: number,
    @Body() createBookDto: EditBookDto,
  ): Promise<Book> {
    return this.bookService.edit(createBookDto, bookId);
  }

  @Delete(':bookId')
  @ApiOkResponse({ type: Book, description: 'Books Deleted' })
  @ApiNotFoundResponse({ description: 'Book Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  async deleteBook(
    @Param(
      'bookId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    bookId: number,
  ): Promise<void> {
    return this.bookService.delete(bookId);
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
