"use client";

import { useBeep } from "@/hooks/use-beep";
import { AudioContextConsole } from "./_components/audio-context-console";
import { AudioBufferForm } from "@/components/audio-buffer-form";
import { AudioBuffers } from "@/components/audio-buffers";

export default function Page() {
  const { beep } = useBeep();
  return (
    <>
      <div className="w-full max-w-[400px] mx-auto my-10">
        <input
          type="text"
          onChange={() => beep()}
          className="border border-slate-400 rounded p-1 w-full"
        />
      </div>
      <AudioContextConsole />
      <AudioBufferForm />
      <AudioBuffers />
    </>
  );
}
