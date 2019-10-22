import React, { useEffect, useState } from "react";
import "./styles/Main.scss";
import axios from "axios";
import Swal from "sweetalert2";

function Card(props) {
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  //state hook for modal initialState false
  const [show, setShow] = useState(false);
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
      //when fetching data from Trivia API we are get topic from props.topic, multiple choice & encoded with url3986
      `https://opentdb.com/api.php?amount=1&category=${topic}&type=multiple&encode=url3986`
    );
    setQuestions(result.data.results);
    // if (topic !== "") {
    //   setQuestions(result.data.results);
    // }
  };
  //   let showModal = () => {
  //     setShow(!show);
  //   };
  //   let hideModal = () => {
  //     setShow(false);
  //   };
  let handleAnswer = val => {
    Swal.fire({
      title: "Answer",
      text: val.target.value,
      //   not able to add a class to sweetalert
      customClass: "swal2-popup"
    });
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
        console.log(elm);
        return (
          <div className="Card-question" key={index}>
            {/* Using decodeURIComponent to decode questions that are return with URL Encoding (RFC 3986) */}
            <h2>{decodeURIComponent(elm.question)}</h2>
            <h3>{elm.difficulty}</h3>
            <button
              value={decodeURIComponent(elm.correct_answer)}
              onClick={e => handleAnswer(e)}
            >
              See Answer
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
