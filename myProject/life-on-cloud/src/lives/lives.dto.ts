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
  footageList:  Array<footages> ;
  footages: [];

  createTime: string;

  tripStartTime: string;

  tripEndTime: string;

  content: string;

  place: string;
  @IsNumber()
  like: number;
}


export class footages{
  createTime: string;
  url: string;
}