"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type UploadFormProps = {
  onUploaded?: () => void;
};

export function UploadForm({ onUploaded }: UploadFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast.error("Выберите файл для загрузки");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Не удалось загрузить файл");
      }

      toast.success("Файл успешно загружен");
      fileInputRef.current.value = "";
      onUploaded?.();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Произошла ошибка");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2 rounded-2xl border border-border/60 bg-background/70 p-4">
      <label className="text-sm font-medium text-foreground">Загрузка файла</label>
      <Input ref={fileInputRef} type="file" accept="image/*" />
      <Button disabled={isUploading} onClick={handleUpload} type="button">
        {isUploading ? "Загрузка..." : "Загрузить"}
      </Button>
    </div>
  );
}
