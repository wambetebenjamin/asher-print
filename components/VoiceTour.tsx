"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const SCRIPT =
  "Welcome to Asher Print, Nairobi's go-to printing and branding company. We print business cards, banners, branded apparel, packaging, and more. Upload your artwork or let our team help with the design. Place your order online, get a confirmed quote within 2 hours, and receive delivery across Nairobi within 24 to 48 hours.";

/**
 * Step 14 voice tour. Fixed bottom left, 56 by 56px, round, z-index 9998.
 * Starts on the first scroll or click, never before user interaction.
 */
export default function VoiceTour() {
  const [speaking, setSpeaking] = useState(false);
  const [ended, setEnded] = useState(false);
  const [supported, setSupported] = useState(false);
  const startedRef = useRef(false);
  const speakingRef = useRef(false);

  useEffect(() => {
    setSupported("speechSynthesis" in window);
    if (!("speechSynthesis" in window)) return;

    const trigger = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      speak();
    };
    window.addEventListener("scroll", trigger, { once: true, passive: true });
    window.addEventListener("click", trigger, { once: true });
    return () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("click", trigger);
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function speak() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(SCRIPT);
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    utterance.lang = "en-KE";
    utterance.onstart = () => {
      speakingRef.current = true;
      setSpeaking(true);
    };
    utterance.onend = () => {
      speakingRef.current = false;
      setSpeaking(false);
      setEnded(true);
    };
    utterance.onerror = () => {
      speakingRef.current = false;
      setSpeaking(false);
    };
    window.speechSynthesis.speak(utterance);
  }

  function toggle(event: React.MouseEvent) {
    event.stopPropagation();
    if (!supported) return;
    if (speakingRef.current) {
      window.speechSynthesis.cancel();
      speakingRef.current = false;
      setSpeaking(false);
      setEnded(true);
      return;
    }
    startedRef.current = true;
    speak();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Site voice tour, click to mute"
      aria-pressed={speaking}
      title="Hear what this site is about"
      className={`group fixed bottom-6 left-6 z-[9998] flex h-14 w-14 items-center justify-center bg-primary text-white shadow-lg ${
        speaking ? "voice-speaking" : ""
      }`}
      style={{ borderRadius: "50%" }}
    >
      {speaking ? (
        <Volume2 size={26} aria-hidden="true" />
      ) : (
        <VolumeX size={26} aria-hidden="true" />
      )}
      <span className="fixed-tooltip left-0">
        {ended ? "Replay tour" : "Hear what this site is about"}
      </span>
      <span className="sr-only">{ended ? "Replay tour" : "Play voice tour"}</span>
    </button>
  );
}
