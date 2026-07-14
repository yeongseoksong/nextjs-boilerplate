"use client";

import { SdErrorView } from "@framework/ui";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <SdErrorView.NotFound
      onHome={() => router.push("/")}
      onBack={() => router.back()}
    />
  );
}
