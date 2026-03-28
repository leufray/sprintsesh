"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, CreditCard, ArrowLeft, ArrowRight } from "lucide-react";
import AppShell from "../../../../components/layout/AppShell";

export default function PaymentPage() {
  const router = useRouter();

  return (
    <AppShell hideTopbar>
      <div className="onboarding-content">
        <h1 className="page-title">Payment</h1>
        <p className="page-subtitle">Complete your subscription to start building.</p>

        <div className="pay-layout">
          <div className="pay-summary">
            <h2 className="pay-summary-title">Subscribe to Studio Plan</h2>
            <div className="pay-summary-price">
              <span className="pay-summary-amount">$150.00</span>
              <span className="pay-summary-period">/ month</span>
            </div>
            <div className="pay-line-items">
              <div className="pay-line"><span>Studio plan</span><span>$150.00</span></div>
              <div className="pay-line pay-line--sub"><span>3,450 credits included</span></div>
              <div className="pay-line pay-line--sub"><span>Priority queue</span></div>
            </div>
            <div className="pay-totals">
              <div className="pay-line"><span>Subtotal</span><span>$150.00</span></div>
              <div className="pay-line"><span>Tax</span><span>$0.00</span></div>
              <div className="pay-line pay-line--total"><span>Total due today</span><span>$150.00</span></div>
            </div>
          </div>

          <div className="pay-form">
            <div className="pay-form-inner">
              <div className="pay-form-header">
                <span className="pay-form-email">michael@gmail.com</span>
                <button className="pay-form-cancel" onClick={() => router.back()}>Cancel</button>
              </div>
              <div className="pay-field">
                <label className="pay-label">CARD INFORMATION</label>
                <div className="pay-input pay-input--card"><CreditCard size={16} /><span className="pay-input-placeholder">1234 1234 1234 1234</span></div>
                <div className="pay-input-row">
                  <div className="pay-input pay-input--half"><span className="pay-input-placeholder">MM / YY</span></div>
                  <div className="pay-input pay-input--half"><span className="pay-input-placeholder">CVC</span></div>
                </div>
              </div>
              <div className="pay-field">
                <label className="pay-label">CARDHOLDER NAME</label>
                <div className="pay-input"><span className="pay-input-placeholder">Full name on card</span></div>
              </div>
              <div className="pay-field">
                <label className="pay-label">BILLING ADDRESS</label>
                <div className="pay-input"><span className="pay-input-placeholder">United States</span></div>
                <div className="pay-input"><span className="pay-input-placeholder">Address</span></div>
              </div>
              <button className="pay-submit" onClick={() => router.push("/success")}>Subscribe</button>
              <div className="pay-secured"><Lock size={12} /><span>Secured by Stripe</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="onboarding-bottom">
        <button className="btn-back" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Go back
        </button>
        <Image src="/step-4.png" alt="Step 4 of 4" width={240} height={8} className="onboarding-step" />
        <button className="btn-next" onClick={() => router.push("/success")}>
          Pay and start building <ArrowRight size={16} />
        </button>
      </div>
    </AppShell>
  );
}
