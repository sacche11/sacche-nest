import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  Double,
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

  @ApiProperty()
  @Column({ name: 'paginas', length: 10 })
  pages: string;

  @ApiProperty()
  @Column({ name: 'autor', length: 255 })
  author: string;

  @ApiProperty()
  @Column({ name: 'editorial', length: 255 })
  editorial: string;

  @ApiProperty()
  @Column({ name: 'precio' })
  price: Double;

  @ApiProperty({ type: Person, required: false })
  @ManyToMany(() => Person, (person) => person.books)
  owners: Person[];
}
