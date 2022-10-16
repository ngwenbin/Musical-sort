export class SoundPlayer {
  audioContext: AudioContext;
  #duration: number;

  constructor(duration?: number) {
    this.audioContext = new window.AudioContext();
    this.#duration = duration ?? 0.1;
  }

  playTone = (freq: number) => {
    const oscillator = this.audioContext.createOscillator();

    oscillator.type = "square";
    oscillator.frequency.value = freq;
    oscillator.connect(this.audioContext.destination);
    oscillator.start(0);
    oscillator.stop(this.#duration);
    return true;
  };
}
