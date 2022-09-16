import { Person } from 'src/entities/person.entity';
import { DataSource } from 'typeorm';

export const personsProviders = [
    {
        provide: 'PERSON_REPOSITORY',
        useFactory: function (dataSource: DataSource) {
            return dataSource.getRepository(Person);
        },
        inject: ['DATA_SOURCE'],
    },
];
