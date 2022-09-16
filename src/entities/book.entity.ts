import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('libro')

export class Book {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ name: 'titulo', length: 255 })
    name: string;

    @ApiProperty()
    id_person: number;
}