"use client";

import { useEffect, useRef } from "react";

export function useBeep() {
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => {
    audio.current = new AudioContext();
  }, []);

  return {
    beep: () => {
      if (!audio.current) return;
      const oscillator = audio.current.createOscillator();
      const gain = audio.current.createGain();

      oscillator.type = "sine";
      oscillator.connect(gain);
      gain.connect(audio.current.destination);
      gain.gain.value = 0.5;
      oscillator.frequency.value = 440 * 2 ** (3 / 12);
      oscillator.start();
      oscillator.stop(audio.current.currentTime + 0.1);
    },
  };
}
