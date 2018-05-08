import React, { Component } from 'react'
import Slider from 'rc-slider'
import AudioManager from './audio'

import Header from './header'
import Footer from './footer'

import './App.css';
import 'rc-slider/assets/index.css'

const audio = new AudioManager()

class Sine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      freq: props.freq || 440,
      pan: props.pan || 0,
      amp: props.amp || 0.2,
    };
    this._updateParam = this._updateParam.bind(this);
    this._sine = audio.addSine(this.state);
  }

  componentDidMount() {
    this._sine.start();
  }

  _updateParam(param, val) {
    const obj = {};
    obj[param] = val;
    this.setState(obj);
    this._sine.update(param, val)
  }

  render() {
    const {freq, pan, amp} = this.state;
    let panWord = '';

    if (pan === -1){
      panWord = '(full left)'
    } else if (pan === 1) {
      panWord = '(full right)'
    } else if (pan === 0) {
      panWord = '(center)'
    }

    return (
      <div className="sine" style={{
        margin: "0 auto",
        width: "40%",
        padding: 5,
      }}>
        <h3>Freq</h3>

        <Slider name="freq" min={200} max={500} step={0.1} value={freq}
               onChange={v => this._updateParam('freq', v)}  />
        {freq}Hz
        <br/>

        <h3>Pan{panWord}</h3>
        <Slider name="pan" min={-1} max={1} step={0.02} value={pan}
                onChange={v => this._updateParam('pan', v)} />
        {pan}
        <br/>

        <h3>Gain</h3>
        <Slider name="amp" min={0} max={1} step={0.02} value={amp}
                onChange={v => this._updateParam('amp', v)} />
        {amp}
      </div>
    );
  }
}

const Explorer = () => {
  return (<div>
    <div style={{
      display: "flex",
      flexDirection: "row",
    }}>
      <Sine freq={435} pan={-1} amp={0.5} />
      <Sine freq={442} pan={1} amp={0.5} />
    </div>
  </div>)
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Explorer/>
        <Footer/>
      </div>
    );
  }
}

export default App;
