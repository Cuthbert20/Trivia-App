import React, { useState, useEffect } from "react";
import "./styles/Main.scss";
import pugSwing from "../media/marion-michele-z_eFLP9aS6s-unsplash.jpg";
import { useSpring, animated } from "react-spring";
import axios from "axios";

function TopicSelect() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [category, setCategory] = useState({ data: [] });
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`https://opentdb.com/api_category.php`);
      // console.log(result.data.trivia_categories);
      setCategory({
        data: result.data.trivia_categories
      });
    }
    fetchData();
  });
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
