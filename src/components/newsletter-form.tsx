"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterForm({ source, dark = false }: { source: string; dark?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email"), source }) });
    const result = await response.json();
    setStatus(response.ok ? "success" : "error");
    setMessage(result.message);
    if (response.ok) form.reset();
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-md" aria-label="Newsletter signup">
      <div className={`flex border-b ${dark ? "border-cream/45" : "border-ink/35"}`}>
        <label htmlFor={`email-${source}`} className="sr-only">Email address</label>
        <input id={`email-${source}`} name="email" type="email" required placeholder="Email address" autoComplete="email" className={`min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-current placeholder:opacity-45 ${dark ? "text-cream" : "text-ink"}`} />
        <button disabled={status === "loading"} className="p-3 disabled:opacity-50" aria-label="Join newsletter"><ArrowRight size={18} /></button>
      </div>
      {message && <p className={`mt-3 text-xs ${status === "error" ? "text-rose-300" : dark ? "text-cream/65" : "text-ink/65"}`} role="status">{message}</p>}
    </form>
  );
}
