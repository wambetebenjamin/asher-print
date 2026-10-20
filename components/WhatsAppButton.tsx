import { WHATSAPP_LINK } from "@/lib/site";

/**
 * Step 15 WhatsApp button with animation 8 (entrance pulse, CSS keyframes).
 * Fixed bottom right, 24px from edges, 56 by 56px, round, z-index 9998.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group whatsapp-entrance fixed bottom-6 right-6 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg"
      style={{ borderRadius: "50%" }}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.06 29l6.76-1.77a12.75 12.75 0 0 0 6.18 1.58h.01c7.06 0 12.8-5.74 12.8-12.81 0-3.42-1.33-6.64-3.75-9.05A12.7 12.7 0 0 0 16.001 3.2Zm0 23.42h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.01 1.05 1.07-3.91-.25-.4a10.56 10.56 0 0 1-1.62-5.64c0-5.86 4.77-10.62 10.63-10.62 2.84 0 5.5 1.11 7.51 3.12a10.56 10.56 0 0 1 3.11 7.51c0 5.86-4.77 10.62-10.62 10.62Zm5.83-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.83 1.04-1.02 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.38-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.14 3.08 1.3 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="fixed-tooltip right-0">Chat with us on WhatsApp</span>
    </a>
  );
}
