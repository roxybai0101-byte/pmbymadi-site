"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export function MediaUploader() {
  const router = useRouter();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (formData: FormData) => {
    try {
      setIsUploading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Ошибка загрузки");
      }

      toast({
        variant: "success",
        title: "Файл загружен",
        description: "Можно использовать изображение в контенте."
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Не удалось загрузить",
        description: error instanceof Error ? error.message : "Попробуйте снова"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      encType="multipart/form-data"
      className="grid gap-4 md:grid-cols-2"
      action={(formData) => {
        const file = formData.get("file") as File | null;
        if (!file || !file.size) {
          toast({
            variant: "destructive",
            title: "Добавьте файл",
            description: "Выберите изображение для загрузки."
          });
          return;
        }
        void handleUpload(formData);
      }}
    >
      <div className="md:col-span-2">
        <Label htmlFor="media-file">Файл</Label>
        <Input id="media-file" type="file" name="file" accept="image/png,image/jpeg,image/webp" required />
      </div>
      <div>
        <Label>Заголовок</Label>
        <Input name="title" placeholder="Название (опционально)" />
      </div>
      <div>
        <Label>Alt-текст</Label>
        <Input name="alt" placeholder="Описание для SEO (опционально)" />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" className="rounded-xl" disabled={isUploading}>
          {isUploading ? "Загрузка..." : "Загрузить"}
        </Button>
      </div>
    </form>
  );
}
