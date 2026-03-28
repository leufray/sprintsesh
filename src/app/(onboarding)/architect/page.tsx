import { Suspense } from "react";
import AppShell from "../../../../components/layout/AppShell";
import ArchitectChatWrapper from "./architect-wrapper";

export default function ArchitectPage() {
  return (
    <AppShell hideTopbar>
      <Suspense>
        <ArchitectChatWrapper />
      </Suspense>
    </AppShell>
  );
}
