"use client";

import { SdErrorView } from "@framework/ui";
import { useRouter } from "next/navigation";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Props) {
  const router = useRouter();

  return (
    <SdErrorView.Page
      error={error}
      onReset={reset}
      onHome={() => router.push("/")}
    />
  );
}
