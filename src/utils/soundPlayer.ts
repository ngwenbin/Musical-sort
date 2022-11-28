export class SoundPlayer {
  #audioContext: AudioContext;
  #duration: number;
  #isSoundOn: boolean;

  constructor(duration?: number) {
    this.#audioContext = new window.AudioContext();
    this.#duration = duration ?? 0.01;
    this.#isSoundOn = false;
  }

  toggleSound = () => {
    this.#isSoundOn = !this.#isSoundOn;
  };

  playTone = (freq: number) => {
    if (this.#isSoundOn) {
      const oscillator = this.#audioContext.createOscillator();

      oscillator.type = "square";
      oscillator.frequency.value = freq * 0.3;
      oscillator.connect(this.#audioContext.destination);
      oscillator.start(this.#audioContext.currentTime);
      oscillator.stop(this.#audioContext.currentTime + this.#duration);
    }
  };
}
