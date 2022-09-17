import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Person, PersonIncludes } from 'src/entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonsService {
  constructor(
    @Inject('PERSON_REPOSITORY')
    private personsRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return this.personsRepository.find();
  }

  async get(id: number, includes?: PersonIncludes[]): Promise<Person> {
    const person: Person | null = await this.personsRepository.findOne({
      where: {
        id,
      },
      relations: {
        children: includes?.includes(PersonIncludes.Children),
        father: includes?.includes(PersonIncludes.Father),
        books: includes?.includes(PersonIncludes.Books),
      },
    });

    if (!person) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return person;
  }
}
