import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Min, } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDictDto {
    @ApiProperty()
    @IsNotEmpty({message:"字典code不能为空"})
    dataCode: string;


    @ApiProperty()
    @IsNotEmpty({message:"字典名不能为空"})
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    dictCode: string;

    @ApiProperty()
    @IsNotEmpty()
    dictValue: string;

    @IsOptional()
    @ApiProperty()
    parent: string;

    @ApiProperty()
    @IsEmpty()
    createTime: string;

    @ApiProperty()
    @IsEmpty()
    updateTime: string;

    @ApiProperty({
        default:2
    })
    status: number;
}
