import { Module } from '@nestjs/common';
import { PersonsController } from 'src/controllers/persons.controller';
import { personsProviders } from 'src/providers/persons.provider';
import { PersonsService } from 'src/services/persons.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonsController],
  providers: [...personsProviders, PersonsService],
})
export class PersonsModule { }
