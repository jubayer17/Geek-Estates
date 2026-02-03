import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateProjectsPageDto {
  @IsOptional() @IsString() heroBadge?: string;
  @IsOptional() @IsString() heroTitle?: string;
  @IsOptional() @IsString() heroDescription?: string;
  
  @IsOptional() @IsString() statsCount1?: string;
  @IsOptional() @IsString() statsLabel1?: string;
  
  @IsOptional() @IsString() statsCount2?: string;
  @IsOptional() @IsString() statsLabel2?: string;

  @IsOptional() @IsArray() @IsString({ each: true }) heroImages?: string[];

  @IsOptional() @IsString() ctaBadge?: string;
  @IsOptional() @IsString() ctaTitleRegular?: string;
  @IsOptional() @IsString() ctaTitleItalic?: string;
  @IsOptional() @IsString() ctaDescription?: string;
  @IsOptional() @IsString() ctaButtonText?: string;
}
