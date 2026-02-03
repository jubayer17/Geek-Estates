import { IsOptional, IsString } from 'class-validator';

export class UpdateCareerPageDto {
  // Hero Section
  @IsOptional() @IsString() heroTitle?: string;
  @IsOptional() @IsString() heroSubtitle?: string;
  @IsOptional() @IsString() heroImage?: string;

  // Values Section
  @IsOptional() @IsString() valuesBadge?: string;
  @IsOptional() @IsString() valuesTitle?: string;
  @IsOptional() @IsString() valuesDescription?: string;

  // Perks Section
  @IsOptional() @IsString() perksBadge?: string;
  @IsOptional() @IsString() perksTitle?: string;
  @IsOptional() @IsString() perksDescription?: string;

  // Jobs Section
  @IsOptional() @IsString() jobsBadge?: string;
  @IsOptional() @IsString() jobsTitle?: string;
  @IsOptional() @IsString() jobsDescription?: string;
}
