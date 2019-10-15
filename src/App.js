import React from "react";
import "./Components/styles/Main.scss";
import TopicSelect from "./Components/TopicSelect";

function App() {
  return (
    <div className="">
      <h1>It's That Time Again, are You Ready to Play?!?!</h1>
      {/* PlayTime Component use hooks with button if yes turn background color to Crimson */}
      <TopicSelect />
    </div>
  );
}

export default App;
