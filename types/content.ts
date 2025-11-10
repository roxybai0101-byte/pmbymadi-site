export type SiteSettingValue = {
  name?: string;
  tagline?: string;
  subheading?: string;
  cta?: {
    label: string;
    href: string;
  };
  seo?: {
    title?: string;
    description?: string;
  };
};

export type ContactSettingValue = {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  instagram?: string;
  telegram?: string;
  tiktok?: string;
  workingHours?: Array<{ days: string; time: string }>;
  mapEmbed?: string;
};
