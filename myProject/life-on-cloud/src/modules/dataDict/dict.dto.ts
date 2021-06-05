import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DictDto {

    @ApiProperty()
    dataCode: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    dictCode: string;

    @ApiProperty()
    dictValue: string;

    @IsOptional()
    @ApiProperty()

    parent: string;

    @ApiProperty()
    createTime: string;

    @ApiProperty()
    updateTime: string;

    @ApiProperty()
    status: number;

    @ApiProperty({
        description:"备注"
    })
    remark: string;

}