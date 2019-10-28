import React, { useEffect, useState } from "react";
import "./styles/Main.scss";
import axios from "axios";
import Swal from "sweetalert2";
import Answer from "./Answer";

function Card(props) {
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  //hook for mapped value elm.difficulty level color, hard ? {color: red} : {color: black}
  const { topic } = props;
  //   console.log(topic);
  useEffect(() => {
    selectCategory();
  });

  let selectCategory = () => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${topic}` //&type=boolean
      )
      .then(res => {
        // console.log(res.data.results);
        //using if statement so category will not display until a topic has been selected
        if (props.topic !== "") {
          setCategory(res.data.results[0].category);
        }
      });
  };
  let topicQuestions = async () => {
    let result = await axios.get(
      //when fetching data from Trivia API we are get topic from props.topic, multiple choice & encoded with url3986
      `https://opentdb.com/api.php?amount=1&category=${topic}&type=multiple&encode=url3986`
    );
    setQuestions(result.data.results);
  };
  let handleAnswer = val => {
    Swal.fire({
      title: "Answer",
      text: val.target.value,
      //   not able to add a class to sweetalert
      customClass: "swal2-popup"
    });
  };
  //creating a function that will shuffle the answer array so that the answer is not always the last value since
  //we are pushing the answer on to the end of the incorrect_answers see variable answers below
  function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
  }
  // console.log(category);
  // console.log(questions);
  return (
    <div className="Card-Container">
      <h3
        style={
          props.topic === ""
            ? { display: "none" }
            : { display: "flex", alignItems: "center", flexDirection: "column" }
        }
      >
        You Have Selected <span id="Card-category"> {category}</span>
      </h3>
      <button id="Card-q-btn" onClick={() => topicQuestions()}>
        New Question
      </button>
      {questions.map((elm, index) => {
        console.log(elm);
        let answers = elm.incorrect_answers;
        answers.push(elm.correct_answer);
        shuffle(answers);
        // console.log(answers);
        const rightAnswer = decodeURIComponent(elm.correct_answer);
        return (
          <div className="Card-question" key={index}>
            {/* Using decodeURIComponent to decode questions that are return with URL Encoding (RFC 3986) */}
            <h2>{decodeURIComponent(elm.question)}</h2>
            <h3>
              Difficulty Level:{" "}
              <span
                className={
                  elm.difficulty === "easy"
                    ? "easy"
                    : elm.difficulty === "medium"
                    ? "medium"
                    : "hard"
                }
              >
                {elm.difficulty}
              </span>
            </h3>
            <Answer
              topic={topic}
              getQuestions={setQuestions}
              answers={answers}
              rightAnswer={rightAnswer}
            />
            {/* <button
              value={decodeURIComponent(elm.correct_answer)}
              onClick={e => handleAnswer(e)}
            >
              See Answer
            </button> */}
          </div>
        );
      })}
    </div>
  );
}

export default Card;
