import Head from "next/head";

const PHONE_DISPLAY = "+91 8433443886";
const PHONE_TEL = "+918433443886";
const WHATSAPP = "918433443886";
const EMAIL = "attrilaboratories@gmail.com";
const ADDRESS_LINES = [
  "Marketed By: Attri Industries",
  "D-239, F Floor, Flat No.-06, Street-10",
  "Near Metro Gate No. 01, Laxmi Nagar",
  "Delhi - 110092",
];
const ADDRESS_QUERY = encodeURIComponent(
  "Attri Industries, D-239, Street 10, Laxmi Nagar, Delhi 110092"
);

export default function HelpCenter() {
  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    "Hi Attri Industries, I need some help."
  )}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`;

  return (
    <>
      <Head>
        <title>Help Center | Attri Industries</title>
        <meta
          name="description"
          content="Need help? Reach Attri Industries by call, WhatsApp, or email, or visit us at Laxmi Nagar, Delhi."
        />
      </Head>

      <section className="bg-[#FAF9FF] min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero */}
          <header
            className="relative overflow-hidden rounded-3xl px-6 py-8 md:px-10 md:py-10 mb-6 md:mb-8"
            style={{
              background: "linear-gradient(135deg, #E9D5FF 0%, #FFFFFF 60%)",
              boxShadow: "0 8px 24px rgba(139,53,184,0.10)",
            }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full bg-[#8B35B8]/10" />
            <div aria-hidden className="pointer-events-none absolute right-24 -bottom-12 h-32 w-32 rounded-full bg-[#D4A847]/15" />
            <div className="relative flex items-center gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white"
                style={{ background: "linear-gradient(145deg, #8B35B8 0%, #5C1F82 100%)", boxShadow: "0 8px 24px rgba(139,53,184,0.35)" }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3C3C] font-heading italic">Help Center</h1>
                <p className="mt-1 text-sm md:text-base text-[#6B7280]">We&apos;re here to help — reach us any time.</p>
              </div>
            </div>
          </header>

          {/* Contact methods */}
          <h2 className="mb-4 text-lg font-semibold text-[#3D3C3C]">Get in touch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {/* Call */}
            <a
              href={`tel:${PHONE_TEL}`}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8B35B8]/30 focus:outline-none focus:ring-2 focus:ring-[#8B35B8]/40 cursor-pointer"
              aria-label={`Call ${PHONE_DISPLAY}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5EEFA] text-[#8B35B8] transition-transform duration-200 group-hover:scale-105">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">Call us</p>
                <p className="mt-0.5 font-semibold text-[#1A1A1A]">{PHONE_DISPLAY}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#8B35B8]">
                Call now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-[#25D366]/40 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 cursor-pointer"
              aria-label="Chat with us on WhatsApp"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7F9EE] text-[#1FA855] transition-transform duration-200 group-hover:scale-105">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">WhatsApp</p>
                <p className="mt-0.5 font-semibold text-[#1A1A1A]">{PHONE_DISPLAY}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#1FA855]">
                Chat now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4A847]/50 focus:outline-none focus:ring-2 focus:ring-[#D4A847]/40 cursor-pointer"
              aria-label={`Email ${EMAIL}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#A07810] transition-transform duration-200 group-hover:scale-105">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">Email</p>
                <p className="mt-0.5 font-semibold text-[#1A1A1A] break-all">{EMAIL}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#A07810]">
                Send email
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </a>
          </div>

          {/* Address + map */}
          <h2 className="mb-4 text-lg font-semibold text-[#3D3C3C]">Visit us</h2>
          <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-card">
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EEFA] text-[#8B35B8]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">Our address</p>
                    <address className="mt-1 not-italic text-[#1A1A1A] leading-relaxed">
                      {ADDRESS_LINES.map((line, i) => (
                        <span key={i} className={i === 0 ? "block font-semibold" : "block text-[#6B7280]"}>{line}</span>
                      ))}
                    </address>
                  </div>
                </div>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#8B35B8] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#5C1F82] focus:outline-none focus:ring-2 focus:ring-[#8B35B8] focus:ring-offset-2 cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 11l19-9-9 19-2-8-8-2z" /></svg>
                  Get directions
                </a>
              </div>
              <div className="min-h-[240px] border-t border-[#E5E7EB] md:border-l md:border-t-0">
                <iframe
                  title="Attri Industries location map"
                  src={`https://maps.google.com/maps?q=${ADDRESS_QUERY}&z=15&output=embed`}
                  className="h-full min-h-[240px] w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
