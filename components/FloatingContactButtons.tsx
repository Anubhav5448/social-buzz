const PHONE_DISPLAY = "+91 98765 43210";
const PHONE_TEL = "+919876543210";
const WHATSAPP_NUMBER = "919876543210"; // no + or spaces for wa.me links
const WHATSAPP_MESSAGE = "Hi! I'd like to know more about your services.";

export default function FloatingContactButtons() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
      <div className="container-page relative h-0">
        {/* CALL — bottom-left */}
        <a
          href={`tel:${PHONE_TEL}`}
          aria-label={`Call us at ${PHONE_DISPLAY}`}
          className="group pointer-events-auto absolute bottom-6 left-6 flex items-center gap-0 overflow-hidden rounded-full bg-ink text-paper shadow-lg shadow-black/30 transition-all duration-300 hover:gap-3 hover:pr-5"
        >
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            <span className="absolute inset-2 rounded-full bg-signal/40 animate-pulse1" />
            <svg
              viewBox="0 0 24 24"
              className="relative z-10 h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>
          </span>
          <span className="max-w-0 whitespace-nowrap font-mono text-xs uppercase tracking-widest opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100">
            {PHONE_DISPLAY}
          </span>
        </a>

        {/* WHATSAPP — bottom-right */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group pointer-events-auto absolute bottom-6 right-6 flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-all duration-300 hover:gap-3 hover:pl-5"
        >
          <span className="max-w-0 whitespace-nowrap font-mono text-xs uppercase tracking-widest opacity-0 transition-all duration-300 group-hover:max-w-[100px] group-hover:opacity-100">
            Chat now
          </span>
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            <span className="absolute inset-2 rounded-full bg-white/30 animate-pulse1" />
            <svg viewBox="0 0 24 24" className="relative z-10 h-6 w-6" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.13L2 22l5.13-1.55a9.83 9.83 0 0 0 4.91 1.32h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14a1.8 1.8 0 0 1-1.24 1.24c-.53.15-1.15.24-3.1-.66-2.6-1.13-4.28-3.75-4.4-3.92-.13-.16-1.05-1.4-1.05-2.67 0-1.27.66-1.9.9-2.16.23-.26.5-.32.67-.32.16 0 .33 0 .48.01.15.01.36-.06.56.43.2.5.68 1.68.75 1.8.06.13.1.28.02.44-.08.16-.13.26-.25.4-.13.14-.27.32-.38.43-.13.13-.27.27-.11.55.15.28.68 1.13 1.47 1.83 1.02.9 1.87 1.19 2.14 1.32.2.1.32.08.44-.05.16-.17.62-.72.78-.97.16-.24.32-.2.53-.12.22.08 1.4.66 1.63.78.24.12.4.18.46.28.06.11.06.6-.14 1.18z" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}