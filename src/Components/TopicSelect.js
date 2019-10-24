import React, { useState, useEffect } from "react";
import "./styles/Main.scss";
import pugSwing from "../media/marion-michele-z_eFLP9aS6s-unsplash.jpg";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import Card from "./Card";

function TopicSelect() {
  //just testing out react-sping api hooks useSpring on variable & animated on the element
  const animation = useSpring({
    from: { opacity: 0, color: "red" },
    to: [
      { opacity: 1, color: "#ffaaee" },
      { opacity: 1, color: "red" },
      { opacity: 0.5, color: "#008000" },
      { opacity: 0.8, color: "black" }
    ]
  });
  const imgAnimation = useSpring({
    from: { opacity: 0 },
    to: [{ opacity: 0.2 }, { opacity: 0.5 }, { opacity: 0.8 }, { opacity: 1 }]
  });
  const [category, setCategory] = useState([]);
  const [topic, setTopic] = useState("");
  // const [topicId, setTopicId] = useState("");
  useEffect(() => {
    topics();
  }, []);
  let topics = () => {
    axios.get(`https://opentdb.com/api_category.php`).then(res => {
      //setting category to the value of the returned promise from the data we fetched from the trivia api
      setCategory(res.data.trivia_categories);
      // console.log(res.data.trivia_categories);
    });
  };
  let handleSelect = res => {
    // console.log(res.target.value);
    setTopic(res.target.value);
  };
  // console.log(topic);
  return (
    <div className="TopicSelect-Container">
      <h1>Select Your Topic</h1>
      <select value={topic} onChange={e => handleSelect(e)}>
        <option value="Select a Topic">Select a Topic</option>
        {category.map((elm, index) => {
          return (
            <option value={elm.id} key={elm.id}>
              {elm.name}
            </option>
          );
        })}
      </select>
      <div className="TopicSelect-spring-div">
        <animated.p style={animation}>
          This element will fade in and change colors
        </animated.p>
        <animated.img
          style={imgAnimation}
          className="fun-img"
          src={pugSwing}
          alt="Pug in a Swing Smiling"
        />
      </div>
      <Card topic={topic} />
    </div>
  );
}

export default TopicSelect;
