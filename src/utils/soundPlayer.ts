export class SoundPlayer {
  #audioContext: AudioContext;
  #duration: number;

  constructor(duration?: number) {
    this.#audioContext = new window.AudioContext();
    this.#duration = duration ?? 0.01;
  }

  playTone = (freq: number) => {
    const oscillator = this.#audioContext.createOscillator();

    oscillator.type = "square";
    oscillator.frequency.value = freq * 0.3;
    oscillator.connect(this.#audioContext.destination);
    oscillator.start(this.#audioContext.currentTime);
    oscillator.stop(this.#audioContext.currentTime + this.#duration);
    return true;
  };
}
