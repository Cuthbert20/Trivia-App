import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Answer(props) {
  console.log(props);
  const { rightAnswer, answers, topic } = props;
  let topicQuestions = async () => {
    let result = await axios.get(
      //when fetching data from Trivia API we are get topic from props.topic, multiple choice & encoded with url3986
      `https://opentdb.com/api.php?amount=1&category=${topic}&type=multiple&encode=url3986`
    );
    props.getQuestions(result.data.results);
  };
  const handleClick = elm => {
    if (elm === rightAnswer) {
      Swal.fire("Way to Go!!", "You Answered Correct!", "success");
      topicQuestions();
    } else {
      Swal.fire("Oh No!", "You Got it Wrong this Time", "error");
    }
  };

  return (
    <div>
      {answers.map((elm, index) => {
        let values = decodeURIComponent(elm);
        console.log(values);
        return (
          <div className="Answer-list" key={index}>
            {/* <li>{decodeURIComponent(elm)}</li> */}
            <button
              className="Answer-btn"
              value={values}
              onClick={() => handleClick(values)}
            >
              {decodeURIComponent(elm)}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Answer;
