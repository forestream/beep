"use client";

import { useAudioContext } from "@/hooks/use-audio-context";

const DISPLAY_KEYS: (keyof AudioContext)[] = [
  "baseLatency",
  "outputLatency",
  "sampleRate",
  "currentTime",
  "state",
];

export function AudioContextConsole() {
  const { audioContext } = useAudioContext();
  const keys = [];
  for (const key in audioContext ?? {}) {
    if (DISPLAY_KEYS.includes(key as keyof AudioContext)) keys.push(key);
  }
  return (
    <div className="max-w-[200px]">
      <h2 className="font-bold">Audio Context Console</h2>
      {keys.map((key) => (
        <div
          key={key}
          className="border-b border-gray-200 p-1 flex gap-4 items-center justify-between"
        >
          <h3 className="text-sm font-bold">{key}</h3>
          <pre className="text-sm">
            {JSON.stringify(audioContext?.[key as keyof AudioContext], null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
