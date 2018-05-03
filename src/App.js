import React, { Component } from 'react';
import Slider from 'rc-slider';
import AudioManager from './audio';

import './App.css';
import 'rc-slider/assets/index.css';

const audio = new AudioManager();

class Sine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      freq: props.freq || 440,
      pan: props.pan || 0,
      amp: props.amp || 0.2,
    };
    this.updateParam = this.updateParam.bind(this);
    this.sine = audio.addSine(this.state);
  }

  updateParam(param, val) {
    const obj = {};
    obj[param] = val;
    this.setState(obj);
    this.sine.update(param, val)
  }

  render() {
    const {freq, pan, amp} = this.state;

    return (
      <div className="sine" style={{
        padding: 10,
        width: "40%",
      }}>
        <h3>freq</h3>

        <Slider name="freq" min={20} max={1000} step={0.1} value={freq}
               onChange={v => this.updateParam('freq', v)}  />
        {freq}Hz
        <br/>

        <h3>pan</h3>
        <Slider name="pan" min={-1} max={1} step={0.02} value={pan}
                onChange={v => this.updateParam('pan', v)} />
        {pan}
        <br/>

        <h3>amp</h3>
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

        <div style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}>
          <h2>Left</h2>
          <h2>Right</h2>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "row",
        }}>
          <Sine freq={440} pan={-1} amp={0.5} />
          <Sine freq={442} pan={1} amp={0.5} />
        </div>
      </div>
    );
  }
}

export default App;
