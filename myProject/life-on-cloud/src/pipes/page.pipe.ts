
import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException, NotAcceptableException } from '@nestjs/common';
import { IsEmpty, validate } from 'class-validator';
import { queryByPageDto } from "../lives/lives.dto";
import { plainToClass } from 'class-transformer';
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: queryByPageDto, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0];
      throw new NotAcceptableException(`${msg}`);
    }
    var {page,pageSize} = value
    if (page === null || page === undefined) {
      value.page = 1
    }
    if (pageSize === null || pageSize === undefined) {
      value.pageSize = 10
    }
    return value;
  }
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

