import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();

    const root = process.cwd(); // корень проекта на сервере билда
    const saveJson = async (name, payload) => {
      const file = path.join(root, "data", ${name}.json);
      await writeFile(file, JSON.stringify(payload, null, 2), "utf8");
    };

    await Promise.all([
      saveJson("site", body.site),
      saveJson("services", body.services),
      saveJson("gallery", body.gallery),
      saveJson("features", body.features),
      saveJson("faq", body.faq),
      saveJson("reviews", body.reviews),
      saveJson("seo", body.seo),
    ]);

    return new Response("OK", { status: 200 });
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
}
