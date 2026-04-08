

export class CreateAboutUsTextDto {
  page: string;
  title: string;
  subtitle: string;
}


export class UpdateAboutUsTextDto {
  page?: string;
  title?: string;
  subtitle?: string;
  isActive?: boolean;
}

