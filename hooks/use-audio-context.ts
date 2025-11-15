"use client";

import { useSyncExternalStore } from "react";
import { audioContextStore } from "@/stores/audio-context-store";

type AudioBufferAction =
  | {
      type: "add";
      payload: {
        id: string;
        buffer: AudioBuffer;
      };
    }
  | {
      type: "remove";
      payload: string;
    };

const serverSnapshot = { audioContext: null, audioBuffers: [] };

export function useAudioContext() {
  const store = useSyncExternalStore(
    audioContextStore.subscribe,
    audioContextStore.get,
    () => serverSnapshot,
  );
  const { audioContext, audioBuffers } = store;

  const dispatch = (action: AudioBufferAction) => {
    switch (action.type) {
      case "add":
        audioContextStore.set({
          ...store,
          audioBuffers: [...audioBuffers, action.payload],
        });
        break;
      case "remove":
        audioContextStore.set({
          ...store,
          audioBuffers: audioBuffers.filter(
            (buffer) => buffer.id !== action.payload,
          ),
        });
        break;
    }
  };

  return { audioContext, audioBuffers: { state: audioBuffers, dispatch } };
}
