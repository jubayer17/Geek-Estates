import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  buttonText1?: string; // optional first button text

  @IsOptional()
  @IsString()
  buttonText2?: string; // optional second button text

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// legacy-section.dto.ts


export class CreateLegacySectionDto {
  @IsOptional()
  @IsString()
  journeyTag?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  emphasis?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateLegacySectionDto {
  @IsOptional()
  @IsString()
  journeyTag?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  emphasis?: string;

  @IsOptional()
  @IsString()
  description?: string;
}



export class CreateFeaturedImageDto {
  @IsInt()
  order: number;

  @IsString()
  label: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class UpdateFeaturedImageDto {
  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}


