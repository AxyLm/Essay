import { IsArray, isEmpty, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class UpdateDictDto {
    @ApiProperty({
        default:""
    })
    @IsNotEmpty({ message: "_id 不能为空" })
    _id: ObjectId

    @ApiProperty()
    @IsNotEmpty({message:"dataCode 不能为空"})
    dataCode: string;

    @ApiProperty()
    @IsNotEmpty({message:"name 不能为空"})
    name: string;

    @ApiProperty()
    @IsNotEmpty({message:"dictCode 不能为空"})
    dictCode: string;

    @ApiProperty()
    @IsNotEmpty({message:"dictValue 不能为空"})
    dictValue: string;

    @ApiProperty()
    @IsOptional()
    parent: string;

    @ApiProperty()
    @IsEmpty({message:"禁止更新updateTime"})
    updateTime: string;

    @ApiProperty()
    @IsEmpty({message:"禁止更新createTime"})
    createTime: string;

    @ApiProperty({
        default:2
    })
    @IsOptional()
    status: number;

}
