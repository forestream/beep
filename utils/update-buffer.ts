export function updateBuffer(buffer: AudioBuffer, frequency: number = 440) {
  const { numberOfChannels, length, sampleRate } = buffer;

  const channelData = Array.from({ length: numberOfChannels }, (_, i) =>
    buffer.getChannelData(i),
  );

  for (let frame = 0; frame < length; frame++) {
    channelData[0][frame] = Math.sin(
      (2 * Math.PI * frame) / (sampleRate / frequency),
    );
  }

  channelData.forEach((_, index) => {
    if (index === 0) return;
    channelData[index].set(channelData[0]);
  });
}
