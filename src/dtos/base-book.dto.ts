import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Double } from 'typeorm';

export class BaseBookDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  pages: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  author: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  editorial: string;

  @ApiProperty()
  price: Double;
}
