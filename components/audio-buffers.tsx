import { useAudioContext } from "@/hooks/use-audio-context";
import { AudioBuffer } from "./audio-buffer";
export function AudioBuffers() {
  const { audioBuffers } = useAudioContext();
  return (
    <div className="flex flex-col gap-2 mt-4 max-w-[300px] w-full">
      <h3 className="font-bold">Audio Buffers</h3>
      {audioBuffers.state.map((buffer) => (
        <AudioBuffer key={buffer.id} buffer={buffer} />
      ))}
    </div>
  );
}
