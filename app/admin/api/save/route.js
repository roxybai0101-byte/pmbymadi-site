import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function POST(req) {
  const { password, data } = await req.json();

  // Пароль (мы настроим в Vercel)
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ message: "Неверный пароль" }, { status: 401 });
  }

  const files = [
    { name: "data/services.json", content: JSON.stringify(data.services, null, 2) },
    { name: "data/gallery.json", content: JSON.stringify(data.gallery, null, 2) },
    { name: "data/seo.json", content: JSON.stringify(data.seo, null, 2) },
  ];

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  for (const file of files) {
    await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: file.name,
      message: "Admin: update " + file.name,
      content: Buffer.from(file.content).toString("base64"),
    });
  }

  return NextResponse.json({ message: "✅ Изменения сохранены! Через 20–40 секунд они попадут на сайт." });
}
