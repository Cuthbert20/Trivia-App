import React, { Component } from "react";
import "./styles/Main.scss";
import pugSwing from "../media/marion-michele-z_eFLP9aS6s-unsplash.jpg";

export default class TopicSelect extends Component {
  render() {
    return (
      <div className="select-container">
        <h1>Select Your Topic</h1>
        <section>
          <img
            className="fun-img"
            src={pugSwing}
            alt="Pug in a Swing Smiling"
          />
        </section>
      </div>
    );
  }
}
