import React, { Component } from 'react'
import Slider from 'rc-slider'
import AudioManager from './audio'

import Header from './header'
import Footer from './footer'

import 'rc-slider/assets/index.css'
import './App.css';

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

        <Slider name="freq" min={50} max={500} step={0.1} value={freq}
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

const audio = new AudioManager();

class Explorer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (<div style={{marginBottom: 50}}>
      <h2 style={{textAlign: "center"}}>Work in progress, please come back later!</h2>

      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}>
        <button style={{fontSize: 20}} onClick={() => audio.start() }>Start</button>
        <button style={{fontSize: 20}} onClick={() => audio.fadeOut() }>Stop</button>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "row",
      }}>
        <Sine freq={400} pan={-1} amp={0.3} />
        <Sine freq={406} pan={1} amp={0.3} />
      </div>
    </div>)
  }
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
