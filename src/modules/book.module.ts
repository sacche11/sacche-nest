import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';

@Module({
    imports:[DatabaseModule],
    controllers: [BookController],
    providers: [...BookProviders, BookService],
})

export class BookModule{ }