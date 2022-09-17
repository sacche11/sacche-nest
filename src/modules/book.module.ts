import { Module } from '@nestjs/common';
import { BookController } from 'src/controllers/book.controller';
import { bookProviders } from 'src/providers/book.provider';
import { BookService } from 'src/services/book.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [...bookProviders, BookService],
})
export class BookModule {}
