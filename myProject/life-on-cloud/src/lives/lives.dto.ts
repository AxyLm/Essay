import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Exclude, Expose,Transform  } from 'class-transformer';

export class queryByPageDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize: number;

}

export class addLives {

}