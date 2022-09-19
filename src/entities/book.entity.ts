import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Person } from './person.entity';

export enum BookIncludes {
  Owners = 'owners',
}

@Entity('libro')
export class Book {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'titulo', length: 255 })
  name: string;

  @ApiProperty({ type: Person, required: false })
  @ManyToMany(() => Person, (person) => person.books)
  owners: Person[];
}
