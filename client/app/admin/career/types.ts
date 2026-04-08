export type CareerPageData = {
  id?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  valuesBadge: string;
  valuesTitle: string;
  valuesDescription: string;
  perksBadge: string;
  perksTitle: string;
  perksDescription: string;
  jobsBadge: string;
  jobsTitle: string;
  jobsDescription: string;
};

export type CareerValue = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type CareerPerk = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  salary: string;
  experience: string;
  location: string;
  deadline: string;
  jobType?: string;
  vacancies?: string;
  category?: string;
  gender?: string;
  longDescription?: string;
  responsibilities?: string[];
  requirements?: string[];
};
