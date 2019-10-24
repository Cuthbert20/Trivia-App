import React from "react";

function Answer(props) {
  console.log(props);
  return (
    <div>
      {props.answers.map((elm, index) => {
        return (
          <ul className="Answer-list" key={index}>
            <li>{decodeURIComponent(elm)}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default Answer;
