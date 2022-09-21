import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePersonDto } from 'src/dtos/create-person.dto';
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

  async create(dto: CreatePersonDto): Promise<Person> {
    const newPerson = this.personsRepository.create(dto);
    this.checkDniUsed(dto.dni);
    await this.personsRepository.save(newPerson);
    return newPerson;
  }

  async edit(dto: CreatePersonDto, personId: number): Promise<Person> {
    const person = await this.getPersonOrFail(personId);
    this.checkDniUsed(dto.dni);
    const editedPerson = this.personsRepository.merge(person, dto);
    await this.personsRepository.save(editedPerson);
    return editedPerson;
  }

  async delete(personId: number): Promise<void> {
    const person = await this.getPersonOrFail(personId);
    await this.personsRepository.remove(person);
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

  private async checkDniUsed(dni: string) {
    const personWithSameDni = this.personsRepository.findOneBy({
      dni: dni,
    });

    if (personWithSameDni) {
      throw new HttpException(
        `A person with dni ${dni} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async getPersonOrFail(id: number): Promise<Person> {
    const person = await this.personsRepository.findOneBy({
      id,
    });

    if (!person) {
      throw new HttpException(
        `A person with id ${id} does not exists`,
        HttpStatus.NOT_FOUND,
      );
    }

    return person;
  }
}
