import type { ReactElement } from "react";
import { SERVICES } from "@/data/services";

const ICONS: Record<string, ReactElement> = {
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
  arrows: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  gamepad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
};

export default function ServiciosPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-16 pb-10 border-b border-border">
          <p className="font-display font-semibold text-xs uppercase tracking-widest text-grape mb-3">
            Lo que hacemos
          </p>
          <h1
            className="font-display font-bold text-white uppercase leading-none max-w-3xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Más que una tienda.
          </h1>
          <p className="font-body text-muted text-base mt-6 max-w-xl leading-relaxed">
            Reparamos, compramos, vendemos y asesoramos. Todo lo que necesitás para tu experiencia gaming está acá.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className="group bg-surface p-10 flex flex-col gap-6 hover:bg-surface-2 transition-colors duration-300 relative overflow-hidden"
            >
              {/* BG number */}
              <div className="absolute -bottom-8 -right-4 font-tech font-bold text-[8rem] text-border/20 select-none pointer-events-none leading-none">
                0{i + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center border border-border text-grape group-hover:border-grape group-hover:glow-grape transition-all duration-300">
                {ICONS[service.icon]}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h2 className="font-display font-bold text-2xl text-white uppercase mb-3">
                  {service.title}
                </h2>
                <p className="font-body text-muted leading-relaxed">
                  {service.longDescription}
                </p>
                {service.price && (
                  <p className="font-tech text-ctrl text-lg mt-5 font-bold">
                    {service.price}
                  </p>
                )}
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/541157649264?text=${encodeURIComponent(service.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-3 px-6 py-3 border border-grape text-grape font-display font-bold text-xs uppercase tracking-widest hover:bg-grape/10 transition-all duration-300 w-fit"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-grape opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
