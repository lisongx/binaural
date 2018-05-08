import React, { PureComponent } from 'react'
import styled from 'styled-components'

class Ear extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {direction, size} = this.props;

    let className = 'ear';
    if (this.props.direction === "left") {
      className += ' flip';
    }

    return (<div style={{fontSize: size, lineHeight: size}} className={className}>
      👂
    </div>)
  }
}

const headerBgColor = "#902626";

const Header = () => {
  return (<section style={{
      backgroundColor: headerBgColor,
    }}>
    <div style={{
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      color: "white",
    }}>

      <div style={{
        display: "flex",
        flexDirection: "row",
        color: "white",
        flexWrap: "nowrap",
        justifyContent: "center",
      }}>
        <Ear direction="left" size={"4em"} />

        <h1 style={{
          fontFamily: "'Patua One', cursive",
          fontSize: "3.2em",
        }}>Binaural<br/>Beats</h1>

        <Ear direction="right" size={"4em"} />
      </div>

      <h2>An interactive Guide</h2>
      <h3>
        By <a href="http://notimportant.org/" style={{
          color: "yellow",
          textDecoration: "none",
        }}>Li Song</a>
      </h3>
    </div>
  </section>)
}


export default Header;
