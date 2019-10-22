import React, { useEffect, useState } from "react";
import "./styles/Main.scss";
import axios from "axios";

function Card(props) {
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const { topic } = props;
  //   console.log(topic);
  useEffect(() => {
    selectCategory();
  });
  //   useEffect(() => {
  //     if (topic !== "") {
  //       topicQuestions();
  //     }
  //   }, []);
  let selectCategory = () => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${topic}` //&type=boolean
      )
      .then(res => {
        console.log(res.data.results);
        //using if statement so category will not display until a topic has been selected
        if (props.topic !== "") {
          setCategory(res.data.results[0].category);
        }
      });
  };
  let topicQuestions = async () => {
    let result = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${topic}`
    );
    setQuestions(result.data.results);
    // if (topic !== "") {
    //   setQuestions(result.data.results);
    // }
  };
  console.log(category);
  console.log(questions);
  return (
    <div className="Card-Container">
      <h1>Card Component</h1>
      <h2>{props.topic}</h2>
      <h3
        style={
          props.topic === ""
            ? { display: "none" }
            : { display: "flex", alignItems: "center", flexDirection: "column" }
        }
      >
        You Have Selected <span id="Card-category"> {category}</span>
      </h3>
      <button onClick={() => topicQuestions()}>Questions!!</button>
      {questions.map((elm, index) => {
        return (
          <div key={index}>
            <h2>{elm.question}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
