import React, { Component } from 'react'
import IdyllDocument from 'idyll-document';
import * as components from 'idyll-components';

import markupUrl from "./article/zh-ch.md";

import AudioManager from './audio'
import Slider from 'rc-slider'

const audio = new AudioManager();

class BinauralBeatOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      freqL: props.freqL || 400,
      freqR: props.freqR || 401,
      amp: props.amp || 0.5,
    };
    this._sineL = null;
    this._sineR = null;
  }

  componentDidMount() {
    this._sineL = audio.addSine({
      freq: this.state.freqL, pan: -1, amp: this.state.amp,
    });

    this._sineR = audio.addSine({
      freq: this.state.freqR, pan: 1, amp: this.state.amp,
    });
    this._sineL.start();
    this._sineR.start();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._sineL.freq = prevProps.freqL;
    this._sineR.freq = prevProps.freqR;
  }

  render() {
    const {freqL, freqR} = this.props;
    const amp = 0.5;
    return (<div style={{marginBottom: 20}}>

      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}>
        <button style={{fontSize: 20}} onClick={() => audio.start() }>Start</button>
        <button style={{fontSize: 20}} onClick={() => audio.fadeOut() }>Stop</button>
      </div>
    </div>)
  }
}

class Document extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markup: null,
    };
  }

  componentDidMount() {
    fetch(markupUrl).then(
      response => response.text()
    ).then(
      text => this.setState({ markup: text })
    )
  }

  render() {
    const { markup } = this.state;
    const allAomponents = Object.assign(components, { BinauralBeatOne });

    if (!markup) {
      return <div>loading...</div>;
    }

    return (<IdyllDocument
      markup={ markup }
      components={ allAomponents }
      datasets={ {} } />)
  }
}

export default Document;
