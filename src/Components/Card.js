import React from "react";
import "./styles/Main.scss";

function Card(props) {
  console.log(props);
  return (
    <div>
      <h1>Card Component</h1>
      <h2>{props.topic}</h2>
    </div>
  );
}

export default Card;
