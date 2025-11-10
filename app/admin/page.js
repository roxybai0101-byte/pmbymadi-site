"use client";
import { useState } from "react";

import site from "/data/site.json";
import services from "/data/services.json";
import prices from "/data/prices.json";
import gallery from "/data/gallery.json";
import features from "/data/features.json";
import faq from "/data/faq.json";
import reviews from "/data/reviews.json";
import seo from "/data/seo.json";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);

  const [data, setData] = useState({
    site,
    services,
    prices,
    gallery,
    features,
    faq,
    reviews,
    seo,
  });

  function saveFile(name, content) {
    const file = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json…
"use client";

import { useState } from "react";

import site from "../../../data/site.json";
import services from "../../../data/services.json";
import gallery from "../../../data/gallery.json";
import features from "../../../data/features.json";
import faq from "../../../data/faq.json";
import reviews from "../../../data/reviews.json";
import seo from "../../../data/seo.json";
"use client";

import { useState } from "react";

// пути к JSON данным (папка /data в корне репозитория)
import siteJson from "../../data/site.json";
import servicesJson from "../../data/services.json";
import galleryJson from "../../data/gallery.json";
import featuresJson from "../../data/features.json";
import faqJson from "../../data/faq.json";
import reviewsJson from "../../data/reviews.json";
import seoJson from "../../data/seo.json";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASS || "madi2025";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);

  const [data, setData] = useState({
    site: siteJson,
    services: servicesJson,
    gallery: galleryJson,
   …
