"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import AppShell from "../../../../components/layout/AppShell";
import StepIndicator from "../../../../components/ui/StepIndicator";

const connectionRows = [
  {
    category: "Code Repository",
    provider: "GitHub",
    desc: "Your code is saved here, and you own it forever.",
    required: true,
  },
  {
    category: "Analytics",
    provider: "Mixpanel",
    desc: "User behavior, funnels, and retention metrics.",
    required: false,
  },
  {
    category: "Subscriptions",
    provider: "RevenueCat",
    desc: "In-app purchases and paywall management.",
    required: false,
  },
  {
    category: "User Emails",
    provider: "Resend",
    desc: "Account verification and milestone notifications.",
    required: false,
  },
];

export default function ConnectionsPage() {
  const router = useRouter();

  return (
    <AppShell hideTopbar>
      <div className="onboarding-scroll-area">
        <div className="onboarding-content">
          <h1 className="page-title">Set up connections</h1>
          <p className="page-subtitle">
            These services will power your app behind the scenes. Connect them
            once before the sprint starts and we&rsquo;ll handle the rest.
          </p>

          {/* Engine card */}
          <div className="conn-engine-card">
            <div className="conn-engine-left">
              <Image
                src="/ss-logo.png"
                alt="Sprintsesh"
                width={40}
                height={40}
                className="conn-engine-logo"
              />
              <div className="conn-engine-info">
                <span className="conn-engine-title">Sprintsesh Engine</span>
                <span className="conn-engine-subtitle">
                  MacOS &bull; OS X 10.13 High Sierra or newer
                </span>
              </div>
            </div>
            <div className="conn-engine-right">
              <span className="conn-row-label conn-row-label--required">Required</span>
              <button className="conn-download-btn">
                <Download size={14} />
                Download
              </button>
            </div>
          </div>

          {/* Connection rows */}
          <div className="conn-rows">
            {connectionRows.map((row) => (
              <div key={row.provider} className="conn-row">
                <div className="conn-row-left">
                  <div className="conn-row-name">
                    <span className="conn-row-category">{row.category}</span>
                    <span className="conn-row-sep"> &bull; </span>
                    <span className="conn-row-provider">{row.provider}</span>
                  </div>
                  <p className="conn-row-desc">{row.desc}</p>
                </div>
                <div className="conn-row-right">
                  <span
                    className={
                      row.required
                        ? "conn-row-label conn-row-label--required"
                        : "conn-row-label conn-row-label--optional"
                    }
                  >
                    {row.required ? "Required" : "Optional"}
                  </span>
                  <button className="conn-connect-btn">Connect</button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom notice */}
          <div className="conn-notice">
            Required services must be connected before your sprint starts.
            Optional services can be added anytime from your project board.
          </div>
        </div>
      </div>

      <div className="onboarding-bottom">
        <button className="btn-back" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Go back
        </button>
        <StepIndicator current={3} />
        <button className="btn-next" onClick={() => router.push("/onboarding/review")}>
          Review your order <ArrowRight size={16} />
        </button>
      </div>
    </AppShell>
  );
}
