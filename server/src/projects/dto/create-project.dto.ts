import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  beds?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  baths?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  area?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  featured?: boolean;
}
