"use client";

import { useSearchParams } from "next/navigation";
import ArchitectChat from "../../../../components/architect-chat";

export default function ArchitectChatWrapper() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt") || "";

  return <ArchitectChat initialPrompt={prompt} />;
}
