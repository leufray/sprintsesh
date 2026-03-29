"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, GitBranch, Database, Map, Smartphone } from "lucide-react";
import AppShell from "../../../../components/layout/AppShell";
import StepIndicator from "../../../../components/ui/StepIndicator";

const autoProvisioned = [
  { icon: Database, name: "Supabase", desc: "Database, auth, and storage", status: "Provisioned" },
  { icon: Map, name: "Mapbox", desc: "Maps and GPS services", status: "Provisioned" },
  { icon: Smartphone, name: "Expo", desc: "Mobile builds for iOS and Android", status: "Provisioned" },
];

const userConnected = [
  { icon: GitBranch, name: "GitHub", desc: "Code repository and version control", required: true, connected: false },
];

export default function ConnectionsPage() {
  const router = useRouter();

  return (
    <AppShell hideTopbar>
      <div className="onboarding-scroll-area">
        <div className="onboarding-content">
        <h1 className="page-title">Set up connections</h1>
        <p className="page-subtitle">
          Sprintsesh provisions most services automatically. You only need to
          connect services that require your account.
        </p>

        <div className="conn-section">
          <h3 className="conn-section-label">AUTO-PROVISIONED</h3>
          <div className="conn-list">
            {autoProvisioned.map((svc) => (
              <div key={svc.name} className="conn-item">
                <div className="conn-item-left">
                  <div className="conn-item-icon conn-item-icon--green"><svc.icon size={20} /></div>
                  <div className="conn-item-info">
                    <span className="conn-item-name">{svc.name}</span>
                    <span className="conn-item-desc">{svc.desc}</span>
                  </div>
                </div>
                <div className="conn-item-status conn-item-status--connected">
                  <Check size={14} />{svc.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="conn-section">
          <h3 className="conn-section-label">REQUIRES YOUR ACCOUNT</h3>
          <div className="conn-list">
            {userConnected.map((svc) => (
              <div key={svc.name} className="conn-item">
                <div className="conn-item-left">
                  <div className="conn-item-icon"><svc.icon size={20} /></div>
                  <div className="conn-item-info">
                    <span className="conn-item-name">{svc.name}</span>
                    <span className="conn-item-desc">{svc.desc}</span>
                  </div>
                </div>
                <div className="conn-item-right">
                  {svc.required && <span className="conn-badge conn-badge--required">Required</span>}
                  <button className="conn-connect-btn">Connect</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      <div className="onboarding-bottom">
        <button className="btn-back" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Go back
        </button>
        <StepIndicator current={3} />
        <button className="btn-next" onClick={() => router.push("/review")}>
          Review your order <ArrowRight size={16} />
        </button>
      </div>
    </AppShell>
  );
}
