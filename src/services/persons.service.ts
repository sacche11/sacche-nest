import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Person } from 'src/entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonsService {
    constructor(
        @Inject('PERSON_REPOSITORY')
        private personsRepository: Repository<Person>,
    ) { }

    async findAll(): Promise<Person[]> {
        return this.personsRepository.find();
    }

    async get(id: number): Promise<Person> {
        const person: Person | null = await this.personsRepository.findOneBy({
            id,
        });

        if (!person) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        return person;
    }
}
