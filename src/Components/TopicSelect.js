import React, { useState, useEffect } from "react";
import "./styles/Main.scss";
import pugSwing from "../media/marion-michele-z_eFLP9aS6s-unsplash.jpg";
import { useSpring, animated } from "react-spring";
import axios from "axios";

function TopicSelect() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [category, setCategory] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await axios.get(`https://opentdb.com/api_category.php`);
  //     // console.log(result.data.trivia_categories);
  //     setCategory(
  //       {
  //         category: result.data.trivia_categories
  //       },
  //       []
  //     );
  //   }
  // });
  useEffect(() => {
    topics();
    // axios.get(`https://opentdb.com/api_category.php`).then(res => {
    //   setCategory({
    //     category: res.data.trivia_categories
    //   });
    // });
  }, []);
  let topics = () => {
    axios.get(`https://opentdb.com/api_category.php`).then(res => {
      //setting category to the value of the returned promise from the data we fetched from the trivia api
      setCategory(res.data.trivia_categories);
      // console.log(res.data.trivia_categories);
    });
  };
  // fetchData();
  console.log(category.length);
  console.log(category);
  return (
    <div className="select-container">
      <h1>Select Your Topic</h1>
      <ul>
        {category.map((elm, index) => {
          return <li key={elm.id}>{elm.name}</li>;
        })}
      </ul>
      <animated.div style={props}>
        <p>I will fade in</p>
        <img className="fun-img" src={pugSwing} alt="Pug in a Swing Smiling" />
      </animated.div>
    </div>
  );
}

export default TopicSelect;
