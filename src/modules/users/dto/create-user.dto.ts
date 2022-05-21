import { Type } from 'class-transformer';
import { Allow, IsArray, IsString, ValidateNested } from 'class-validator';

class MetaCreateUserDto {
  @IsArray()
  @IsString({ each: true })
  array: string[];
}

// class ResHttpDto<T> {
//   success: boolean;
//   error: Error | null;
//   data: T;
// } generic

export class CreateUserDto {
  @IsString()
  name: string;

  @Allow()
  privateField: string;

  @Allow()
  @ValidateNested()
  @Type(() => MetaCreateUserDto)
  meta: MetaCreateUserDto;
}
