import { Module } from '@nestjs/common';
import { PersonsModule } from './persons.module';

@Module({
  imports: [PersonsModule],
  providers: [],
})
export class AppModule { }
