import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import './App.css';
import 'rc-slider/assets/index.css';

class Sine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      freq: props.freq || 440,
      pan: props.pan || 0,
      amp: props.amp || 0.2,
    };
    this.updateParam = this.updateParam.bind(this);
  }

  updateParam(param, value) {
    const obj = {};
    obj[param] = value;
    this.setState(obj);
  }

  render() {
    const {freq, pan, amp} = this.state
    // create web audio api context
    const audioCtx = new window.AudioContext();

    // create Oscillator node
    const oscillator = audioCtx.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();

    return (
      <div className="sine" style={{
        padding: 20,
      }}>
        <h2>freq</h2>
        <Slider name="freq" min={20} max={1500} step={0.5} value={freq}
               onChange={v => this.updateParam('freq', v)}  />
        {freq}Hz
        <br/>

        <h2>pan</h2>
        <Slider name="pan" min={-1} max={1} step={0.02} value={pan}
                onChange={v => this.updateParam('pan', v)} />
        {pan}
        <br/>
        <h2>amp</h2>
        <Slider name="amp" min={0} max={1} step={0.02} value={amp}
                onChange={v => this.updateParam('amp', v)} />
        {amp}
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Sine/>
      </div>
    );
  }
}

export default App;
