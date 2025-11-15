"use client";

import { useAudioContext } from "@/hooks/use-audio-context";
import { updateBuffer } from "@/utils/update-buffer";
import { useState } from "react";

export function AudioBuffer({
  buffer,
}: {
  buffer: { id: string; buffer: AudioBuffer };
}) {
  const { audioContext } = useAudioContext();
  const [frequency, setFrequency] = useState(440 * 2 ** (3 / 12));
  return (
    <div key={buffer.id} className="items-center flex gap-2 mb-2">
      <p className="grow">{buffer.id}</p>
      <input
        type="number"
        min={0}
        step={1}
        value={Math.floor(frequency)}
        onChange={(e) => {
          setFrequency(Number(e.target.value));
        }}
        className="border w-25 text-right rounded border-slate-400"
      />
      <button
        onClick={() => {
          if (!audioContext) return;
          updateBuffer(buffer.buffer, frequency);
          const source = audioContext.createBufferSource();
          source.buffer = buffer.buffer;
          source.connect(audioContext.destination);
          source.start();
        }}
        className="border border-slate-400 rounded p-1 hover:border-slate-500 transition-all cursor-pointer"
      >
        Play
      </button>
    </div>
  );
}
