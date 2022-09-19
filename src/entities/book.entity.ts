import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Person } from './person.entity';

export enum BookIncludes {
  Owner = 'owner',
}

@Entity('libro')
export class Book {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'titulo', length: 255 })
  name: string;

  @ApiProperty()
  @Column({ name: 'id_persona' })
  ownerId: number;

  @ApiProperty({ type: Person, required: false })
  @ManyToOne(() => Person, (person) => person.books)
  @JoinColumn({ name: 'id_persona' })
  owner: Person;
}
