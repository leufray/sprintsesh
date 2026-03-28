"use client";

import { useRouter } from "next/navigation";
import { Rocket, Bell, Plus, ArrowRight } from "lucide-react";
import AppShell from "../../../../components/layout/AppShell";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <AppShell hideTopbar>
      <div className="onboarding-content">
        <div className="success-content">
          <div className="success-icon"><Rocket size={48} /></div>
          <h1 className="page-title">Sprintimer is being built</h1>
          <p className="page-subtitle">
            Your AI team is writing the product brief, designing screens, and
            setting up the project structure. This usually takes 10–14 hours.
          </p>

          <div className="success-status">
            <div className="success-status-label">Architect is writing the sprint plan...</div>
            <div className="success-sprint-info"><span>Sprint 1 of 2</span></div>
            <div className="success-progress">
              <div className="success-progress-bar"><div className="success-progress-fill" /></div>
              <span className="success-progress-time">00:25 elapsed</span>
            </div>
          </div>

          <div className="success-actions">
            <button className="success-btn-secondary" onClick={() => router.push("/projects/demo")}>
              Watch your app get built
            </button>
            <button className="success-btn-primary"><Bell size={16} />Set up notifications</button>
          </div>

          <div className="success-new">
            <h3 className="success-new-title">Have another idea?</h3>
            <p className="success-new-desc">Start building another app while this one is in progress.</p>
            <button className="success-new-btn"><Plus size={16} />Start new project</button>
          </div>
        </div>
      </div>

      <div className="onboarding-bottom">
        <div />
        <div />
        <button className="btn-next" onClick={() => router.push("/projects/demo")}>
          Go to build screen <ArrowRight size={16} />
        </button>
      </div>
    </AppShell>
  );
}
