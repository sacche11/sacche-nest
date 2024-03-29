import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  Check,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.entity';

export enum PersonIncludes {
  Children = 'children',
  Father = 'father',
  Books = 'books',
}

@Entity('persona')
@Check(`"id" <> "fatherId"`)
export class Person {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'nombre', length: 255 })
  name: string;

  @ApiProperty()
  @Column({ name: 'dni', length: 255, unique: true })
  dni: string;

  @ApiProperty()
  @Column({ name: 'id_padre', unique: false, nullable: true, default: null })
  fatherId: number;

  /*@OneToOne(() => Person, (person) => person.father)
  @JoinColumn({ name: 'id_padre' })
  father: Person;*/

  @ApiProperty({ type: Person, isArray: true })
  @OneToMany(() => Person, (person) => person.father)
  children: Person[];

  @ApiProperty({ type: Person, required: false })
  @ManyToOne(() => Person, (person) => person.children, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  }) // Decorator
  @JoinColumn({ name: 'id_padre' })
  father?: Person; //property

  @ApiProperty({ type: Book, isArray: true })
  @ManyToMany(() => Book, (book) => book.owners)
  @JoinTable()
  books: Book[];
}
