"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buildContactURL } from "@/lib/whatsapp";

const WA_URL = buildContactURL();

export function WhatsAppBubble() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end gap-3">

      {/* Tooltip — aparece al hacer hover sobre el grupo */}
      <motion.div
        initial={{ opacity: 0, x: 8, scale: 0.95 }}
        whileHover={{ opacity: 1, x: 0, scale: 1 }}
        className="group-hover:opacity-100 pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-mono text-[11px] uppercase tracking-[0.12em] whitespace-nowrap px-3 py-1.5 rounded-[4px]"
          style={{
            background: "rgba(10,10,10,0.88)",
            color: "#F5F4F0",
          }}
        >
          Consultanos por WhatsApp
        </span>
      </motion.div>

      {/* Botón + pulso */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 16, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.48, ease: [0.2, 0.8, 0.2, 1], delay: 1.8 }}
      >
        {/* Anillo de pulso */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ background: "#25D366" }}
          animate={{ scale: [1, 1.55], opacity: [0.35, 0] }}
          transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Botón principal */}
        <Link
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribinos por WhatsApp"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          style={{ background: "#25D366" }}
        >
          <motion.span
            className="flex"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.93 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <WhatsAppIcon />
          </motion.span>

          {/* Tooltip inline — visible solo en hover del botón */}
          <span
            className="absolute right-full mr-3 font-mono text-[11px] uppercase tracking-[0.12em] whitespace-nowrap px-3 py-1.5 rounded-[4px] pointer-events-none select-none
                       opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all"
            style={{
              background: "rgba(10,10,10,0.88)",
              color: "#F5F4F0",
              transitionDuration: "220ms",
            }}
            aria-hidden
          >
            Consultanos por WhatsApp
          </span>
        </Link>
      </motion.div>

    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}
