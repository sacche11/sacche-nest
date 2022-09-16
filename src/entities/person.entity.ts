import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('persona')
export class Person {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ name: 'nombre', length: 255 })
    name: string;

    @ApiProperty()
    @Column({ name: 'dni', length: 255 })
    dni: string;
}
