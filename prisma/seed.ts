import { PrismaClient, PortfolioCategory, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const defaultAdminEmail = process.env.ADMIN_EMAIL ?? "admin@pm-by-madi.com";
  const defaultAdminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  const passwordHash = await bcrypt.hash(defaultAdminPassword, 12);

  await prisma.user.upsert({
    where: { email: defaultAdminEmail },
    update: {
      passwordHash,
      role: UserRole.ADMIN
    },
    create: {
      email: defaultAdminEmail,
      name: "Madina",
      passwordHash,
      role: UserRole.ADMIN
    }
  });

  await prisma.$transaction([
    prisma.advantage.deleteMany(),
    prisma.portfolioItem.deleteMany(),
    prisma.review.deleteMany(),
    prisma.faq.deleteMany(),
    prisma.service.deleteMany(),
    prisma.siteSetting.deleteMany()
  ]);

  const services = [
    {
      title: "Пудровые брови",
      slug: "pudrovye-brovi",
      shortDescription: "Нежная растушёвка с эффектом натуральной тени и плавным переходом пикселей.",
      longDescription:
        "Техника рассеивания пигмента в верхних слоях кожи, которая создаёт мягкий эффект воздушной тени. Перед процедурой мы выполняем диагностику, строим эскиз с учётом вашей архитектуры лица и утверждаем оттенок под цветотип. Работает натурально и ухоженно даже без декоративной косметики.",
      duration: "2–2.5 часа",
      price: "55 000 ₸",
      isFeatured: true,
      order: 1
    },
    {
      title: "Перманент губ",
      slug: "permanent-gub",
      shortDescription:
        "Ровный контур и деликатное заполнение тоном без плотного «тату»-эффекта.",
      longDescription:
        "Мягкое пиксельное нанесение пигмента позволяет подчеркнуть природный тон и скорректировать асимметрию. Сохраняется ощущение натуральности, а губы выглядят свежими и увлажнёнными. Оттенок подберём индивидуально, учитывая пожелания и цветотип.",
      duration: "2.5–3 часа",
      price: "60 000 ₸",
      isFeatured: true,
      order: 2
    },
    {
      title: "Межресничная стрелка",
      slug: "mezhresnichnaya-strelka",
      shortDescription: "Выразительный взгляд без декоративной стрелки благодаря заполнению межресничного пространства.",
      longDescription:
        "Тонкая и деликатная межресничная стрелка создаёт эффект густых ресниц и подчёркивает форму глаз. Визуально делает взгляд более открытым, при этом остаётся невидимой на коже.",
      duration: "1.5–2 часа",
      price: "45 000 ₸",
      order: 3
    },
    {
      title: "Коррекция",
      slug: "korrekciya",
      shortDescription: "Уточнение формы и оттенка через 4–8 недель после процедуры для идеальной посадки пигмента.",
      longDescription:
        "Повторная встреча помогает закрепить результат, скорректировать оттенок и плотность. Рекомендуется всем для стойкости и ровного схода пигмента.",
      duration: "1–1.5 часа",
      price: "25 000 ₸",
      order: 4
    },
    {
      title: "Удаление старого ПМ",
      slug: "udalenie-starogo-pm",
      shortDescription: "Деликатное осветление или выведение старого татуажа без агрессивных травм.",
      longDescription:
        "Работаем современными составами и техниками, чтобы мягко осветлить или полностью удалить прежний перманент. Подбираем стратегию после консультации и теста кожи.",
      duration: "до 2 часов",
      price: "от 35 000 ₸",
      order: 5
    }
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  const advantages = [
    {
      title: "Стерильность",
      description: "Одноразовые иглы, барьерные плёнки, стерильные наборы и медицинский протокол на каждом этапе.",
      icon: "ShieldCheck",
      order: 1
    },
    {
      title: "Сертифицированные пигменты",
      description: "Использую европейские бренды с безопасными составами и прогнозируемым выцветанием.",
      icon: "FlaskConical",
      order: 2
    },
    {
      title: "Индивидуальный подбор формы",
      description: "Работаю с архитектурой лица, костной структурой и цветотипом, чтобы подчеркнуть природную эстетику.",
      icon: "Ruler",
      order: 3
    },
    {
      title: "Мягкие техники",
      description: "Деликатное втирание пигмента без излишней травматизации, комфортно даже с низким болевым порогом.",
      icon: "Feather",
      order: 4
    },
    {
      title: "Поддержка после процедуры",
      description: "Вы получаете детальную памятку и сопровождение в период заживления.",
      icon: "HeartHandshake",
      order: 5
    }
  ];

  for (const advantage of advantages) {
    await prisma.advantage.create({ data: advantage });
  }

  const portfolioItems = [
    {
      title: "Пудровые брови — натуральная дымка",
      category: PortfolioCategory.BROWS,
      description: "Мягкое перекрытие пробелов с сохранением природной формы.",
      imageUrl: "https://res.cloudinary.com/demo/image/upload/v1699999999/pm-by-madi/portfolio/brows-01.jpg",
      publicId: "pm-by-madi/portfolio/brows-01",
      order: 1,
      isFeatured: true
    },
    {
      title: "Акварельный перманент губ",
      category: PortfolioCategory.LIPS,
      description: "Деликатный тон без чёткой границы, максимально естественно.",
      imageUrl: "https://res.cloudinary.com/demo/image/upload/v1699999999/pm-by-madi/portfolio/lips-01.jpg",
      publicId: "pm-by-madi/portfolio/lips-01",
      order: 2
    },
    {
      title: "Межресничка для выразительного взгляда",
      category: PortfolioCategory.LASHLINE,
      description: "Чистая линия между ресничками, создающая визуальную густоту.",
      imageUrl: "https://res.cloudinary.com/demo/image/upload/v1699999999/pm-by-madi/portfolio/eyes-01.jpg",
      publicId: "pm-by-madi/portfolio/eyes-01",
      order: 3
    },
    {
      title: "Удаление старого ПМ бровей",
      category: PortfolioCategory.REMOVAL,
      description: "Постепенное осветление старого татуажа до нейтрального фона.",
      imageUrl: "https://res.cloudinary.com/demo/image/upload/v1699999999/pm-by-madi/portfolio/removal-01.jpg",
      publicId: "pm-by-madi/portfolio/removal-01",
      order: 4
    }
  ];

  for (const item of portfolioItems) {
    await prisma.portfolioItem.create({ data: item });
  }

  const reviews = [
    {
      author: "Алина",
      content: "Пудровые брови очень натурально, форма идеальная. Нашли мой оттенок, и заживление прошло без стресса.",
      rating: 5,
      serviceName: "Пудровые брови",
      order: 1
    },
    {
      author: "Мария",
      content: "Губы свежие и аккуратные, без «тату-эффекта». Чувствую себя уверенно даже без помады.",
      rating: 5,
      serviceName: "Перманент губ",
      order: 2
    },
    {
      author: "Ольга",
      content: "Межресничка — теперь не трачу время на стрелки. Просыпаюсь с идеальным взглядом.",
      rating: 5,
      serviceName: "Межресничная стрелка",
      order: 3
    }
  ];

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  const faqs = [
    {
      question: "Как подготовиться к процедуре?",
      answer:
        "За 24 часа исключите кофе, алкоголь, БАДы-разжижители крови. Не делайте коррекцию формы бровей/губ, чтобы я увидела естественную архитектуру.",
      category: "Подготовка",
      order: 1
    },
    {
      question: "Больно ли делать перманент?",
      answer:
        "Работаю в мягких техниках с современными анестетиками. Дискомфорт минимальный и легко переносится даже с низким болевым порогом.",
      category: "Комфорт",
      order: 2
    },
    {
      question: "Сколько держится результат?",
      answer:
        "В среднем 1.5–3 года в зависимости от типа кожи, ухода и образа жизни. Освежающая коррекция возможна по желанию.",
      category: "Стойкость",
      order: 3
    },
    {
      question: "Как ухаживать и что ожидать в заживлении?",
      answer:
        "Даю памятку с рекомендациями. Первые 7 дней — деликатное умывание, заживляющий бальзам и отсутствие солнца/сауны. Пигмент раскрывается постепенно.",
      category: "Уход",
      order: 4
    },
    {
      question: "Есть ли противопоказания?",
      answer:
        "Абсолютные: беременность, лактация, онкология, незажившие дерматиты, свежие процедуры на зоне. Об относительных расскажу на консультации.",
      category: "Противопоказания",
      order: 5
    },
    {
      question: "Когда нужна коррекция?",
      answer:
        "Рекомендую встречу через 4–8 недель, когда кожа полностью восстановилась. Коррекция закрепляет результат и продлевает стойкость.",
      category: "Коррекция",
      order: 6
    },
    {
      question: "Как записаться?",
      answer:
        "Напишите в WhatsApp или Telegram, расскажите о желаемой услуге, и я предложу ближайшие свободные даты и подготовку.",
      category: "Запись",
      order: 7
    }
  ];

  for (const faq of faqs) {
    await prisma.faq.create({ data: faq });
  }

  await prisma.siteSetting.create({
    data: {
      slug: "primary",
      businessName: "PM BY MADI",
      whatsapp: "+7 700 000 00 00",
      whatsappLink: "https://wa.me/77000000000",
      telegram: "https://t.me/pm_by_madi",
      instagram: "https://instagram.com/pm_by_madi",
      address: "Алматы, ул. Самал, 12",
      email: "hello@pm-by-madi.com",
      latitude: 43.2372,
      longitude: 76.9456,
      seoTitle: "PM BY MADI — премиальный перманентный макияж",
      seoDescription:
        "Перманентный макияж в мягких техниках: пудровые брови, перманент губ и межресничная стрелка. Стерильность, индивидуальный подход и стойкий результат.",
      seoImage: "https://pm-by-madi.com/og-default.png"
    }
  });
}

main()
  .then(async () => {
    console.info("✅ Database seeded successfully.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Seed failed", error);
    await prisma.$disconnect();
    process.exit(1);
  });
