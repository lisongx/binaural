import React from 'react'
import styled from 'styled-components'

const Link = styled.a`
  display: inline;
  color: yellow;
  text-decoration: none;
  font-weight: 800;
`

const headerBgColor = "#902626";

const Footer = () => {
  return (<section style={{
      backgroundColor: headerBgColor,
    }}>
    <div style={{
      textAlign: "left",
      color: "white",
      padding: "2em",
    }}>
      <p>
        Design and developed By <Link href="http://notimportant.org/">Li Song</Link> <br/>
        Released under <Link href="https://creativecommons.org/licenses/by/4.0/">CC-BY-4.0</Link> <br/>
        Source code at <Link href="https://github.com/seansay/binaural">Github</Link>
      </p>
    </div>
  </section>)
}


export default Footer;
