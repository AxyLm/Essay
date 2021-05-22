import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class queryByPageDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  page: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  pageSize: number;

}

export class addLives {
  @ApiProperty()
  footageList: Array<footages>;

  footages: [];

  createTime: string;
  @ApiProperty()
  tripStartTime: string;
  @ApiProperty()
  tripEndTime: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  place: string;
  @ApiProperty()
  @IsNumber()
  like: number;
  @ApiProperty()
  @IsNumber()
  liveStatus: number;
}

export class footages {
  @ApiProperty()
  createTime: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  sort: number;
}