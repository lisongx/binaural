
class SineOsc {
  constructor(ctx, freq, pan, amp) {
    this._ctx = ctx;
    this._osc = this._ctx.createOscillator();
    this._panner = this._ctx.createStereoPanner();
    this._osc.type = 'sine';
    this._osc.frequency.setValueAtTime(freq, this._ctx.currentTime);
    this._gain = this._ctx.createGain();
    this._gain.gain.setValueAtTime(amp, this._ctx.currentTime);
    this._panner.pan.value = pan;
    this._connectGraph();
  }

  start() {
    this._osc.start();
  }

  _connectGraph() {
    this._osc.connect(this._panner);
    this._panner.connect(this._gain);
    this._gain.connect(this._ctx.destination);
  }

  stop() {
    this._osc.stop();
  }

  resume() {
    if (this._ctx.state === "suspended") {
      this._ctx.resume();
    }
  }

  update(param, val) {
    // TODO: any more clever way of writing this?
    if (param === 'freq') {
      this.freq = val;
    } else if (param === 'pan') {
      this.pan = val;
    } else if (param === 'amp') {
      this.amp = val;
    }
    this.resume();
  }

  get freq() {
    return this._osc.frequency.value;
  }

  set freq(val) {
    this._osc.frequency.setValueAtTime(val, this._ctx.currentTime);
  }

  get pan() {
    return this._panner.pan.value;
  }

  set pan(val) {
    this._panner.pan.value = val;
  }

  get amp() {
    return this._gain.gain.value;
  }

  set amp(val) {
    this._gain.gain.setValueAtTime(val, this._ctx.currentTime);
  }
}


class AudioManager {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  addSine({freq, pan, amp}) {
    const sine = new SineOsc(this.ctx, freq, pan, amp);
    return sine;
  }
}

export default AudioManager;
