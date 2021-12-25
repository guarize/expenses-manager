import React, { Component } from 'react';
import '../styles/Blob.css';

class Blobs extends Component {
  render() {
    return (
      <>
        <section className="stage first-stage">
          <figure className="ball first-ball">
            <span className="shadow" />
          </figure>
        </section>
        <section className="stage second-stage">
          <figure className="ball second-ball">
            <span className="shadow" />
          </figure>
        </section>
      </>
    );
  }
}

export default Blobs;
