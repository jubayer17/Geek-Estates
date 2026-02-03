import { IsString } from 'class-validator';

export class CreatePerkDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  icon: string;
}
