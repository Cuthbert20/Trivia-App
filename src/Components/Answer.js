import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Answer(props) {
  console.log(props);
  const { rightAnswer, answers, topic } = props;
  let topicQuestions = async () => {
    let result = await axios.get(
      //https://opentdb.com/api.php?amount=1&category=23&encode=url3986
      //when fetching data from Trivia API we are get topic from props.topic, multiple choice & encoded with url3986
      `https://opentdb.com/api.php?amount=1&category=${topic}&encode=url3986`
    );
    props.getQuestions(result.data.results);
  };
  const handleClick = possibleAnswer => {
    if (possibleAnswer === rightAnswer) {
      Swal.fire("Way to Go!!", "You Answered Correct!", "success");
      topicQuestions();
    } else {
      Swal.fire("Oh No!", "You Got it Wrong this Time", "error");
    }
  };

  return (
    <div>
      {answers.map((possibleAnswer, index) => {
        let values = decodeURIComponent(possibleAnswer);
        console.log(values);
        return (
          <div className="Answer-list" key={index}>
            {/* <li>{decodeURIComponent(possibleAnswer)}</li> */}
            <button
              className="Answer-btn"
              value={values}
              onClick={() => handleClick(values)}
            >
              {decodeURIComponent(possibleAnswer)}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Answer;
