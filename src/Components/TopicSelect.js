import React from "react";
import "./styles/Main.scss";
import pugSwing from "../media/marion-michele-z_eFLP9aS6s-unsplash.jpg";
import { useSpring, animated } from "react-spring";

function TopicSelect() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <div className="select-container">
      <h1>Select Your Topic</h1>
      <section></section>
      <animated.div style={props}>
        <p>I will fade in</p>
        <img className="fun-img" src={pugSwing} alt="Pug in a Swing Smiling" />
      </animated.div>
    </div>
  );
}

export default TopicSelect;
