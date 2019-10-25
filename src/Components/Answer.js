import React from "react";
import Swal from "sweetalert2";

function Answer(props) {
  //   console.log(props);
  const { rightAnswer, answers } = props;
  const handleClick = elm => {
    if (elm === rightAnswer) {
      Swal.fire("Way to Go!!", "You Answered Correct!", "success");
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
