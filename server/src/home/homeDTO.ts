import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateHeroBannerDto {
  @IsOptional()
  @IsString()
  badgeText?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
