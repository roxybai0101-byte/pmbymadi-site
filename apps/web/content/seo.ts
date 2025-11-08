export const siteConfig = {
  name: "PM BY MADI",
  description: {
    ru: "Премиальный перманентный макияж: брови, губы, веки. Стерильность, сертифицированные пигменты и полное сопровождение.",
    en: "Premium permanent makeup studio delivering bespoke brows, lips and eyeliner with certified pigments and full aftercare."
  },
  url: process.env.SITE_URL ?? "https://pmbymadi.com",
  ogImage: "/og-default.png",
  twitter: "@pmbymadi",
  email: "hello@pmbymadi.com",
  whatsapp: process.env.WHATSAPP_PHONE ?? "+48 000 000 000",
  address: "Ul. Mokotowska 12, Warsaw, Poland"
};

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ul. Mokotowska 12",
    addressLocality: "Warsaw",
    postalCode: "00-001",
    addressCountry: "PL"
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.whatsapp,
      email: siteConfig.email,
      availableLanguage: ["ru", "en"]
    }
  ],
  sameAs: [
    "https://instagram.com/pmbymadi",
    "https://t.me/pmbymadi",
    "https://wa.me/" + siteConfig.whatsapp.replace(/[^\\d]/g, "")
  ]
};
