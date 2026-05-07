"use client";

import { useState, useEffect, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "spotgames_newsletter_email";

type FormState = "idle" | "loading" | "success";

export function FooterNewsletter() {
  const id = useId();
  const reducedMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) setAlreadySubscribed(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    // Simulate async (no real API in demo)
    await new Promise((r) => setTimeout(r, 900));
    localStorage.setItem(STORAGE_KEY, email);
    setState("success");
  }

  if (alreadySubscribed) {
    return (
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-grey-2">
        Ya estás suscripto · Gracias
      </p>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {state === "success" ? (
        <motion.p
          key="success"
          initial={!reducedMotion ? { opacity: 0, y: 4 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-neon"
        >
          ¡Listo! Te avisamos cuando haya novedades.
        </motion.p>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full"
          aria-label="Suscripción a novedades"
        >
          <label
            htmlFor={id}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-grey-2"
          >
            Novedades y ofertas
          </label>
          <div className="flex gap-2">
            <input
              id={id}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@mail.com"
              required
              disabled={state === "loading"}
              className={cn(
                "flex-1 min-w-0 bg-white/8 border border-white/15 rounded-[3px]",
                "px-3 py-2 font-body text-[14px] text-paper placeholder:text-grey-2",
                "outline-none transition-colors",
                "hover:border-white/25 focus:border-white/40",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              style={{ transitionDuration: "var(--dur-fast)" }}
            />
            <button
              type="submit"
              disabled={state === "loading" || !email}
              className={cn(
                "flex items-center justify-center px-4 py-2 rounded-[3px]",
                "bg-neon text-ink font-mono text-[11px] uppercase tracking-[0.12em] font-medium",
                "transition-colors hover:bg-neon-deep",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
                "min-w-[72px]"
              )}
              style={{ transitionDuration: "var(--dur-fast)" }}
            >
              {state === "loading" ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="animate-spin"
                  aria-label="Enviando"
                >
                  <circle cx="7" cy="7" r="5" stroke="#0A0A0A" strokeWidth="1.5" strokeOpacity="0.25" />
                  <path d="M12 7a5 5 0 0 1-5 5" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                "Suscribir"
              )}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
