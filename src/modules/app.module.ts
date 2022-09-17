import { Module } from '@nestjs/common';
import { BookModule } from './book.module';
import { PersonsModule } from './persons.module';

@Module({
  imports: [PersonsModule, BookModule],
  providers: [],
})
export class AppModule { }
