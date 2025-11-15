import { createStore } from "@/utils/create-store";

export interface AudioContextStore {
  audioContext: AudioContext | null;
  audioBuffers: { id: string; buffer: AudioBuffer }[];
}

export const audioContextStore = createStore<AudioContextStore>({
  audioContext: typeof AudioContext !== "undefined" ? new AudioContext() : null,
  audioBuffers: [],
});
