import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, Matches } from 'class-validator';

export class BasePersonDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsString()
  @ApiProperty()
  @Matches(/^((\d{7,8})|(\d{1,2}\.\d{3}\.\d{3}))$/)
  dni: string;
}
