import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ParseEnumPipe,
  ParseEnumPipeOptions,
  Optional,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

const VALIDATION_ERROR_MESSAGE_NOT_ARRAY = 'Validation failed (array expected)';

@Injectable()
export class ParseEnumArrayPipe<T> implements PipeTransform<any, Promise<T[]>> {
  private readonly parseEnumPipe: ParseEnumPipe<T>;

  constructor(
    protected readonly enumType: T,
    @Optional() options?: ParseEnumPipeOptions,
  ) {
    this.parseEnumPipe = new ParseEnumPipe(enumType, options);
  }

  async transform(values: any, metadata: ArgumentMetadata): Promise<T[]> {
    if (!values) return values;
    if (!Array.isArray(values)) {
      throw new HttpException(
        VALIDATION_ERROR_MESSAGE_NOT_ARRAY,
        HttpStatus.BAD_REQUEST,
      );
    }

    const parsedArray: T[] = [];
    for (const value of values) {
      parsedArray.push(await this.parseEnumPipe.transform(value, metadata));
    }
    return parsedArray;
  }
}
