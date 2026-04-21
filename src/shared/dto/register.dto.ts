import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsString()
  @IsNotEmpty()
  region: string;
  @IsString()
  @IsOptional()
  district: string;
}
