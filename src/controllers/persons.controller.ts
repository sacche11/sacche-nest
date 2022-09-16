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
import { Person } from 'src/entities/person.entity';
import { PersonsService } from 'src/services/persons.service';

@Controller('persons')
@ApiTags('persons')
export class PersonsController {
  constructor(private personsService: PersonsService) { }

  @Get()
  @ApiOkResponse({ type: Person, isArray: true, description: 'Persons List' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  async getAllPersons(): Promise<Person[]> {
    return this.personsService.findAll();
  }

  @Get(':personId')
  @ApiOkResponse({ type: Person, description: 'Person Found' })
  @ApiNotFoundResponse({ description: 'Person Not Found' })
  @ApiNotAcceptableResponse({ description: 'Not Acceptable' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  async getPerson(
    @Param(
      'personId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    personId: number,
  ): Promise<Person> {
    return this.personsService.get(personId);
  }
}
