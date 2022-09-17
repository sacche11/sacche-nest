import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseEnumPipe,
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
import { Person, PersonIncludes } from 'src/entities/person.entity';
import { ParseEnumArrayPipe } from 'src/pipes/parse-enum-array.pipe';
import { PersonsService } from 'src/services/persons.service';

@Controller('persons')
@ApiTags('persons')
export class PersonsController {
  constructor(private personsService: PersonsService) {}

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
  @ApiQuery({
    name: 'includes',
    enum: PersonIncludes,
    isArray: true,
    required: false,
  })
  async getPerson(
    @Param(
      'personId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    personId: number,
    @Query(
      'includes',
      new ParseArrayPipe({ optional: true }),
      new ParseEnumArrayPipe(PersonIncludes),
    )
    includes?: PersonIncludes[],
  ): Promise<Person> {
    return this.personsService.get(personId, includes);
  }
}
