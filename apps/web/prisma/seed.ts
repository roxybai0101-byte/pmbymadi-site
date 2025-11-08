import { PrismaClient, PortfolioTag } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const services = [
  {
    slug: "powder-brows",
    title: { ru: "Пудровые брови", en: "Powder Brows" },
    description: {
      ru: "Нежная растушёвка с идеальной архитектурой для естественного объёма и мягкости линий.",
      en: "Soft shading with tailored architecture for natural volume and gentle definition."
    },
    duration: "2.5 часа",
    price: 32000,
    seoTitle: {
      ru: "Пудровые брови — премиальный перманентный макияж",
      en: "Powder Brows — premium permanent makeup"
    },
    seoDescription: {
      ru: "Персональная техника для идеальных бровей с эффектом аэрографа и длительной стойкостью.",
      en: "Tailored technique for perfect brows with an airbrushed finish and lasting wear."
    }
  },
  {
    slug: "lip-blush",
    title: { ru: "Перманент губ", en: "Lip Blush" },
    description: {
      ru: "Чистый цвет, плавные переходы и стойкий блеск без необходимости ежедневного макияжа.",
      en: "Refined color, smooth gradients and long-lasting lustre without daily makeup."
    },
    duration: "2 часа",
    price: 29000,
    seoTitle: {
      ru: "Перманент губ — идеальный тон и контур",
      en: "Lip blush permanent makeup — perfect tone and contour"
    },
    seoDescription: {
      ru: "Индивидуальный подбор оттенка и мягкая техника для бархатистого эффекта натуральных губ.",
      en: "Custom shade selection and gentle technique for a velvety natural lip finish."
    }
  },
  {
    slug: "lash-enhancement",
    title: { ru: "Межресничная стрелка", en: "Lash Enhancement" },
    description: {
      ru: "Аккуратный акцент без графичности — подчёркивает взгляд и визуально уплотняет ресницы.",
      en: "Delicate accent that enhances eyes and creates the effect of fuller lashes."
    },
    duration: "1.5 часа",
    price: 22000,
    seoTitle: {
      ru: "Межресничная стрелка — выразительный взгляд каждый день",
      en: "Lash enhancement — defined eyes every day"
    },
    seoDescription: {
      ru: "Тонкая линия вдоль ресниц для выразительного взгляда и естественного акцента.",
      en: "Thin line along the lashes for expressive eyes and a natural accent."
    }
  },
  {
    slug: "touch-up",
    title: { ru: "Коррекция", en: "Touch-Up" },
    description: {
      ru: "Актуализируем цвет и насыщенность, сохраняем идеальную форму спустя время.",
      en: "Refresh color and vibrancy while maintaining flawless shape over time."
    },
    duration: "1.5 часа",
    price: 15000,
    seoTitle: {
      ru: "Коррекция перманентного макияжа",
      en: "Permanent makeup touch-up service"
    },
    seoDescription: {
      ru: "Регулярное обновление оттенка и насыщенности для поддержания результата.",
      en: "Scheduled shade refresh to preserve the original result."
    }
  },
  {
    slug: "removal",
    title: { ru: "Удаление старого ПМ", en: "Removal" },
    description: {
      ru: "Деликатное осветление нежелательного пигмента без травмирования кожи.",
      en: "Gentle lifting of unwanted pigment without compromising the skin."
    },
    duration: "2 часа",
    price: 34000,
    seoTitle: {
      ru: "Удаление и осветление старого перманента",
      en: "Removal and correction of previous permanent makeup"
    },
    seoDescription: {
      ru: "Работаем с любым цветом и глубиной пигмента, подготавливаем к новому результату.",
      en: "Address any pigment tone and depth to prepare for a refined result."
    }
  }
];

const advantages = [
  {
    key: "sterility",
    title: { ru: "Абсолютная стерильность", en: "Absolute sterility" },
    description: {
      ru: "Все инструменты стерилизуются, а расходники используются одноразовые.",
      en: "All instruments are sterilised; disposables are single-use only."
    }
  },
  {
    key: "pigments",
    title: { ru: "Сертифицированные пигменты", en: "Certified pigments" },
    description: {
      ru: "Только премиальные пигменты с предсказуемым выцветанием и натуральными оттенками.",
      en: "Premium pigments with predictable fading and natural tones only."
    }
  },
  {
    key: "custom-shape",
    title: { ru: "Индивидуальная архитектура", en: "Tailored architecture" },
    description: {
      ru: "Форма строится с учётом анатомии, симметрии и пожеланий клиента.",
      en: "Shapes designed for anatomy, symmetry and personal preference."
    }
  },
  {
    key: "soft-techniques",
    title: { ru: "Мягкие техники", en: "Gentle techniques" },
    description: {
      ru: "Используем современные аппараты с минимальной травматичностью кожи.",
      en: "Modern devices for minimal skin trauma and swift recovery."
    }
  },
  {
    key: "healing-support",
    title: { ru: "Поддержка при заживлении", en: "Healing support" },
    description: {
      ru: "Сопровождаем на каждом этапе, консультируем и даём инструкции.",
      en: "Support at every stage with consultations and tailored guidance."
    }
  }
];

const reviews = [
  {
    name: { ru: "Мария", en: "Maria" },
    rating: 5,
    text: {
      ru: "Мади идеально подобрала форму и оттенок. Брови выглядят естественно и держатся уже больше года!",
      en: "Madi found the perfect shape and tone. My brows look natural and have lasted over a year!"
    }
  },
  {
    name: { ru: "Анна", en: "Anna" },
    rating: 5,
    text: {
      ru: "Перманент губ превзошёл ожидания — цвет очень деликатный и освежающий.",
      en: "The lip blush exceeded expectations – the colour is delicate yet refreshing."
    }
  },
  {
    name: { ru: "Екатерина", en: "Ekaterina" },
    rating: 5,
    text: {
      ru: "Очень аккуратная межресничка, глаза стали выразительнее, но без эффекта макияжа.",
      en: "Beautifully subtle lash line, my eyes are brighter without looking made up."
    }
  },
  {
    name: { ru: "Полина", en: "Polina" },
    rating: 4,
    text: {
      ru: "Заживление прошло быстро, Мади всегда была на связи и поддерживала.",
      en: "Healing was quick and Madi stayed in touch throughout."
    }
  },
  {
    name: { ru: "София", en: "Sofia" },
    rating: 5,
    text: {
      ru: "Удаление прошло мягко, удалось полностью перекрыть старый холодный оттенок.",
      en: "Removal was gentle and completely lifted the previous cool pigment."
    }
  }
];

const faqItems = [
  {
    question: {
      ru: "Как подготовиться к процедуре перманентного макияжа?",
      en: "How should I prepare for the procedure?"
    },
    answer: {
      ru: "За 48 часов исключите алкоголь и разжижающие кровь препараты, за сутки — интенсивные пилинги. Перед процедурой мы проведём консультацию и построим эскиз.",
      en: "Avoid alcohol and blood-thinning medication 48 hours prior, and skip intensive peels the day before. We'll hold a consultation and draft the outline in-studio."
    }
  },
  {
    question: {
      ru: "Как долго держится результат?",
      en: "How long does the result last?"
    },
    answer: {
      ru: "В среднем стойкость 1.5–2 года. Для поддержания насыщенности рекомендуем коррекцию раз в 12–18 месяцев.",
      en: "On average the result lasts 1.5–2 years. Plan a touch-up every 12–18 months for the best colour depth."
    }
  },
  {
    question: {
      ru: "Больно ли делать перманентный макияж?",
      en: "Is permanent makeup painful?"
    },
    answer: {
      ru: "Комфорт процедуры достигается за счёт мягкой техники и топовых аппаратов. Используем локальную анестезию по показаниям.",
      en: "The process is comfortable thanks to gentle techniques and premium devices. We apply topical anaesthetics when needed."
    }
  },
  {
    question: {
      ru: "Можно ли делать перманент во время беременности?",
      en: "Can I get permanent makeup while pregnant?"
    },
    answer: {
      ru: "Беременность и лактация относятся к относительным противопоказаниям. Рекомендуем перенести процедуру и проконсультироваться с врачом.",
      en: "Pregnancy and breastfeeding are relative contraindications. Please postpone and consult your physician."
    }
  },
  {
    question: {
      ru: "Как проходит заживление?",
      en: "What is the healing process like?"
    },
    answer: {
      ru: "Отёчность и цветовые колебания нормальны в первые дни. Мы выдаём подробные рекомендации по уходу и остаёмся на связи.",
      en: "Mild swelling and colour variations are normal in the first days. You'll receive detailed aftercare guidance and support."
    }
  },
  {
    question: {
      ru: "Можно ли записаться на консультацию онлайн?",
      en: "Can I book a consultation online?"
    },
    answer: {
      ru: "Да, оставьте заявку на сайте или свяжитесь через WhatsApp/Telegram. Также можно забронировать предоплату через Stripe Checkout.",
      en: "Yes, submit a request on the website or reach out via WhatsApp/Telegram. You can also secure your slot with a Stripe Checkout deposit."
    }
  }
];

const portfolioPlaceholders = [
  {
    publicId: "pm-by-madi/portfolio1",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1715000000/makeup-1.jpg",
    tag: PortfolioTag.BROWS
  },
  {
    publicId: "pm-by-madi/portfolio2",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1715000000/makeup-2.jpg",
    tag: PortfolioTag.LIPS
  },
  {
    publicId: "pm-by-madi/portfolio3",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1715000000/makeup-3.jpg",
    tag: PortfolioTag.EYELIDS
  },
  {
    publicId: "pm-by-madi/portfolio4",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1715000000/makeup-4.jpg",
    tag: PortfolioTag.REMOVAL
  }
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@pmbymadi.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const whatsappPhone = process.env.WHATSAPP_PHONE ?? "+48 000 000 000";

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
      name: "Administrator"
    }
  });

  await prisma.settings.upsert({
    where: { id: 1 },
    update: {
      whatsappPhone,
      phoneNumber: whatsappPhone,
      instagramUrl: "https://instagram.com/pmbymadi",
      telegramUrl: "https://t.me/pmbymadi",
      brandStatement: {
        ru: "Премиальный перманентный макияж с вниманием к деталям и уважением к естественной красоте.",
        en: "Premium permanent makeup with attention to detail and respect for natural beauty."
      },
      seoTitle: {
        ru: "PM BY MADI — премиальный перманентный макияж в Варшаве",
        en: "PM BY MADI — premium permanent makeup studio in Warsaw"
      },
      seoDescription: {
        ru: "Брови, губы, межресничка. Безупречная стерильность, сертифицированные пигменты, сопровождение на каждом этапе.",
        en: "Brows, lips, lash line. Impeccable sterility, certified pigments and full aftercare support."
      },
      address: "Ul. Mokotowska 12, Warsaw",
      mapUrl: "https://maps.google.com/?q=Ul.+Mokotowska+12+Warsaw",
      stripeSuccessUrl: "https://pmbymadi.com/ru/checkout/success",
      stripeCancelUrl: "https://pmbymadi.com/ru/services"
    },
    create: {
      id: 1,
      whatsappPhone,
      phoneNumber: whatsappPhone,
      instagramUrl: "https://instagram.com/pmbymadi",
      telegramUrl: "https://t.me/pmbymadi",
      brandStatement: {
        ru: "Премиальный перманентный макияж с вниманием к деталям и уважением к естественной красоте.",
        en: "Premium permanent makeup with attention to detail and respect for natural beauty."
      },
      seoTitle: {
        ru: "PM BY MADI — премиальный перманентный макияж в Варшаве",
        en: "PM BY MADI — premium permanent makeup studio in Warsaw"
      },
      seoDescription: {
        ru: "Брови, губы, межресничка. Безупречная стерильность, сертифицированные пигменты, сопровождение на каждом этапе.",
        en: "Brows, lips, lash line. Impeccable sterility, certified pigments and full aftercare support."
      },
      address: "Ul. Mokotowska 12, Warsaw",
      mapUrl: "https://maps.google.com/?q=Ul.+Mokotowska+12+Warsaw",
      stripeSuccessUrl: "https://pmbymadi.com/ru/checkout/success",
      stripeCancelUrl: "https://pmbymadi.com/ru/services"
    }
  });

  await prisma.portfolioItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.service.deleteMany();

  await prisma.$transaction(
    services.map((service, index) =>
      prisma.service.create({
        data: {
          ...service,
          order: index + 1,
          published: true
        }
      })
    )
  );

  await prisma.$transaction(
    portfolioPlaceholders.map((item, index) =>
      prisma.portfolioItem.create({
        data: {
          publicId: item.publicId,
          imageUrl: item.imageUrl,
          tag: item.tag,
          order: index + 1,
          published: true,
          alt: {
            ru: "Портфолио PM BY MADI",
            en: "PM BY MADI portfolio"
          },
          title: {
            ru: "Работа PM BY MADI",
            en: "PM BY MADI artwork"
          }
        }
      })
    )
  );

  await prisma.$transaction(
    reviews.map((review) =>
      prisma.review.create({
        data: {
          ...review,
          published: true
        }
      })
    )
  );

  await prisma.$transaction(
    faqItems.map((item, index) =>
      prisma.faqItem.create({
        data: {
          ...item,
          order: index + 1,
          published: true
        }
      })
    )
  );

  await prisma.lead.create({
    data: {
      name: "Demo Lead",
      phone: whatsappPhone,
      locale: "ru",
      comment: "Первичная заявка с сайта для примера.",
      serviceName: services[0]?.title.ru ?? "Пудровые брови",
      source: "seed",
      notifiedEmail: false,
      notifiedTelegram: false
    }
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
