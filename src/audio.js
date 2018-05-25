
class SineOsc {
  constructor(ctx, freq, pan, amp, outputNode) {
    this._ctx = ctx;
    this._osc = this._ctx.createOscillator();
    this._panner = this._ctx.createStereoPanner();
    this._osc.type = 'sine';
    this._osc.frequency.setValueAtTime(freq, this._ctx.currentTime);
    this._gain = this._ctx.createGain();
    this._gain.gain.setValueAtTime(amp, this._ctx.currentTime);
    this._panner.pan.value = pan;
    this._output = outputNode;
    this._connectGraph();
  }

  start() {
    this._osc.start();
  }

  _connectGraph() {
    this._osc.connect(this._panner);
    this._panner.connect(this._gain);
    this._gain.connect(this._output);
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
    this._masterGain = this.ctx.createGain();
    this._masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this._fadeDur = 1;
  }

  _connectGraph() {
    this._masterGain.connect(this.ctx.destination);
  }

  start() {
    this._connectGraph();
  }

  _rampTo(amp, dur) {
    this._masterGain.gain.exponentialRampToValueAtTime(
      amp, this.ctx.currentTime + dur);
  }

  fadeIn() {
    this._rampTo(1.0, this._fadeDur);
  }

  fadeOut() {
    this._rampTo(0, this._fadeDur);
  }

  addSine({freq, pan, amp}) {
    const sine = new SineOsc(this.ctx, freq, pan, amp, this._masterGain);
    return sine;
  }
}

export default AudioManager;
