import { useAudioContext } from "@/hooks/use-audio-context";
import { nanoid } from "nanoid";
import { useState } from "react";

export function AudioBufferForm() {
  const [seconds, setSeconds] = useState(1);
  const handleChangeSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeconds(Number(e.target.value));
  };

  const [sampleRate, setSampleRate] = useState(44100);
  const handleChangeSampleRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSampleRate(Number(e.target.value));
  };

  const length = seconds * sampleRate;

  const { audioContext, audioBuffers } = useAudioContext();
  console.log(audioBuffers.state);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!audioContext) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const numOfChannels = formData.get("numOfChannels") as string;
    const length = formData.get("length") as string;
    const sampleRate = formData.get("sampleRate") as string;
    const buffer = audioContext.createBuffer(
      Number(numOfChannels),
      Number(length),
      Number(sampleRate),
    );
    audioBuffers.dispatch({
      type: "add",
      payload: {
        id: nanoid(12),
        buffer,
      },
    });
  };

  if (!audioContext) return null;
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-[300px] mt-4"
    >
      <h3 className="font-bold">Audio Buffer Form</h3>
      <div className="flex gap-2 justify-between">
        <label htmlFor="numOfChannels">numOfChannels</label>
        <input
          className="border w-25 text-right rounded border-slate-400"
          id="numOfChannels"
          name="numOfChannels"
          defaultValue={2}
          type="number"
          min={1}
          max={32}
        />
      </div>
      <div className="flex gap-2 justify-between">
        <label htmlFor="numSeconds">numSeconds</label>
        <input
          className="border w-25 text-right rounded border-slate-400"
          id="numSeconds"
          name="numSeconds"
          type="number"
          min={1}
          max={300}
          onChange={handleChangeSeconds}
          value={seconds}
        />
      </div>
      <div className="flex gap-2 justify-between">
        <label htmlFor="length">length</label>
        <input
          value={length}
          className="border w-25 text-right rounded border-slate-400"
          id="length"
          name="length"
          type="number"
          readOnly
        />
      </div>
      <div className="flex gap-2 justify-between">
        <label htmlFor="sampleRate">sampleRate</label>
        <input
          className="border w-25 text-right rounded border-slate-400"
          id="sampleRate"
          name="sampleRate"
          type="number"
          step={10}
          min={8000}
          max={96000}
          value={sampleRate}
          onChange={handleChangeSampleRate}
        />
      </div>
      <button
        className="border  border-slate-400 rounded p-1 hover:border-slate-500 transition-all cursor-pointer"
        type="submit"
      >
        Create Buffer
      </button>
    </form>
  );
}
