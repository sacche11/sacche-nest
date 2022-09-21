import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  Delete,
  Patch,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreatePersonDto } from 'src/dtos/create-person.dto';
import { EditPersonDto } from 'src/dtos/edit-person.dto';
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

  @Post()
  @ApiOkResponse({ type: Person, description: 'Create Person' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  async createPerson(
    @Body() createPersonDto: CreatePersonDto,
  ): Promise<Person> {
    return this.personsService.create(createPersonDto);
  }

  @Patch(':personId')
  @ApiOkResponse({ type: Person, description: 'Person Edited' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Person Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  async editPerson(
    @Param(
      'personId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    personId: number,
    @Body() createPersonDto: EditPersonDto,
  ): Promise<Person> {
    return this.personsService.edit(createPersonDto, personId);
  }

  @Delete(':personId')
  @ApiOkResponse({ type: Person, description: 'Persons Deleted' })
  @ApiNotFoundResponse({ description: 'Person Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Errror' })
  async deletePerson(
    @Param(
      'personId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    personId: number,
  ): Promise<void> {
    return this.personsService.delete(personId);
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
