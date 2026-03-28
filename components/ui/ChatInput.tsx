"use client";

import { useState, useRef } from "react";
import { Paperclip, Mic, ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSubmit: (value: string) => void;
}

export default function ChatInput({ onSubmit }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    if (
      inputRef.current &&
      inputRef.current.scrollWidth > inputRef.current.clientWidth
    ) {
      setExpanded(true);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          const len = textareaRef.current.value.length;
          textareaRef.current.setSelectionRange(len, len);
        }
      }, 0);
    }
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
    if (el.scrollHeight > 160) {
      el.classList.add("scrolling");
    } else {
      el.classList.remove("scrolling");
    }
    if (!e.target.value.trim()) {
      setExpanded(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }

  function handleSubmit() {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
    setExpanded(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleTextareaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const hasText = value.trim().length > 0;

  return (
    <div className={`chat-input-wrap${expanded ? " expanded" : ""}`}>
      {/* Default state — single line input */}
      {!expanded && (
        <>
          <button className="chat-input-btn" type="button">
            <Paperclip size={20} />
          </button>
          <input
            ref={inputRef}
            type="text"
            className="chat-input-single"
            placeholder="Reply..."
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <button className="chat-input-btn" type="button">
            <Mic size={20} />
          </button>
          <button
            className={`chat-input-send${hasText ? " active" : ""}`}
            onClick={handleSubmit}
            type="button"
          >
            <ArrowUp size={20} />
          </button>
        </>
      )}

      {/* Expanded state — multiline textarea */}
      {expanded && (
        <>
          <textarea
            ref={textareaRef}
            className="chat-input-textarea"
            value={value}
            onChange={handleTextareaChange}
            onKeyDown={handleTextareaKeyDown}
            rows={1}
          />
          <div className="chat-input-bottom-row">
            <button className="chat-input-btn" type="button">
              <Paperclip size={20} />
            </button>
            <div className="chat-input-bottom-right">
              <button className="chat-input-btn" type="button">
                <Mic size={20} />
              </button>
              <button
                className={`chat-input-send${hasText ? " active" : ""}`}
                onClick={handleSubmit}
                type="button"
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
