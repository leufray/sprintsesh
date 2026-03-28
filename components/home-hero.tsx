"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Paperclip, Mic, ArrowUp } from "lucide-react";

const placeholders = [
  "Create a mobile app that tracks my sprints...",
  "Create a web app for real estate agents to log showings...",
  "Create a desktop app that organizes my files…",
  "Create a mobile food diary with AI-powered insights...",
  "Create a social app for local basketball games…",
  "Create a marketplace for freelance photographers...",
];

const attachChips = [
  "Screenshots",
  "Logos",
  "PDFs",
  "Websites",
  "Audio",
  "Figma files",
];

export default function HomeHero() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Typewriter placeholder cycling */
  useEffect(() => {
    const target = placeholders[placeholderIndex];
    let charIndex = 0;
    setDisplayedPlaceholder("");

    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayedPlaceholder(target.slice(0, charIndex));
      if (charIndex >= target.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 2400);
      }
    }, 40);

    return () => clearInterval(typeInterval);
  }, [placeholderIndex]);

  /* Auto-resize textarea */
  const resizeTextarea = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    resizeTextarea();
  };

  /* Submit */
  const submitPrompt = () => {
    if (!prompt.trim()) return;
    router.push(`/architect?prompt=${encodeURIComponent(prompt.trim())}`);
  };

  /* Enter = submit, Shift+Enter = newline */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitPrompt();
    }
  };

  const hasText = prompt.trim().length > 0;

  return (
    <section className="home-hero">
      <h1 className="home-hero-headline">
        Launch a{" "}
        <span className="home-hero-headline-accent">real</span>
        <br />
        <span className="home-hero-headline-accent">app</span> today
      </h1>
      <p className="home-hero-subtitle">
        Describe your idea and a team of autonomous AI agents will design and
        build your app from prompt to production in hours, not months.
      </p>

      <div className="home-prompt">
        <div className="home-prompt-box">
          <textarea
            ref={textareaRef}
            className="home-prompt-textarea"
            rows={1}
            value={prompt}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={displayedPlaceholder}
          />
          <div className="home-prompt-bottom">
            <div className="home-prompt-attachments">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                multiple
                className="home-prompt-file-input"
              />
              <button
                className="home-prompt-attach-label"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="home-prompt-attach-icon" />
                Attach anything
              </button>
              {attachChips.map((chip) => (
                <button key={chip} className="home-prompt-chip">
                  {chip}
                </button>
              ))}
            </div>
            <div className="home-prompt-actions">
              <button className="home-prompt-mic">
                <Mic size={20} />
              </button>
              <button
                className={`home-prompt-send${hasText ? " home-prompt-send--active" : ""}`}
                onClick={submitPrompt}
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="home-platforms">
          <button className="home-platform-chip">iOS &amp; Android apps</button>
          <button className="home-platform-chip">Web apps</button>
          <button className="home-platform-chip">Desktop apps</button>
        </div>
      </div>
    </section>
  );
}
