"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

type Props = {
  initialSuccess?: boolean;
  initialError?: string;
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors focus:border-emerald-500/60 focus:bg-white/[0.07]";

export function ContactForm({ initialSuccess = false, initialError }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot — kept in state so a hydrated React submit forwards it too.
  // Name is deliberately non-semantic ("hp_field") so browser/Google autofill
  // does not recognise it as a real field and pre-populate it.
  const [hpField, setHpField] = useState("");

  const [status, setStatus] = useState<Status>(
    initialSuccess ? "success" : initialError ? "error" : "idle"
  );
  const [errorMsg, setErrorMsg] = useState(initialError ?? "");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, hp_field: hpField }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Failed to send. Check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-12 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="size-6 text-emerald-400" />
        </span>
        <h2 className="text-xl font-semibold text-zinc-100">Message sent</h2>
        <p className="max-w-sm text-sm text-zinc-400">
          Thanks for the feedback — we read every message and will get back to you if a
          reply is needed.
        </p>
        <button
          type="button"
          onClick={() => {
            setName("");
            setEmail("");
            setMessage("");
            setStatus("idle");
          }}
          className="mt-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Honeypot: visually hidden + off the accessibility tree. Real users
          never see or fill it; bots that auto-fill inputs get flagged. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="hp_field">Leave this field empty</label>
        <input
          id="hp_field"
          name="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hpField}
          onChange={(e) => setHpField(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-zinc-300">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-zinc-300">
          Message / Feedback
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="Share your feedback, a bug report, or a feature idea…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-3.5 py-2.5 text-sm text-red-400">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
        )}
        {status === "loading" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
