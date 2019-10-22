import React, { useEffect, useState } from "react";
import "./styles/Main.scss";
import axios from "axios";

function Card(props) {
  const [category, setCategory] = useState("");
  const { topic } = props;
  console.log(topic);
  useEffect(() => {
    topicQuestions();
  });
  let topicQuestions = () => {
    let result = axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${topic}` //&type=boolean
      )
      .then(res => {
        console.log(res.data.results[0].category);
        //using if statement so category will not display until a topic has been selected
        if (props.topic === "") {
          setCategory("");
        } else {
          setCategory(res.data.results[0].category);
        }
      });
  };
  return (
    <div className="Card-Container">
      <h1>Card Component</h1>
      <h2>{props.topic}</h2>
      <h3>{category}</h3>
    </div>
  );
}

export default Card;
