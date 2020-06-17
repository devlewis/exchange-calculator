import React from "react";
import "./App.css";
import Form from "../Form/Form";
import moneyEmoji from "../../images/MoneywithWingsEmoji.png";
import calculator from "../../images/hiclipart.com.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header">
          <h1>Exchange Calculator.</h1>
          <img src={moneyEmoji} alt="moneywithwingsemoji" />
          <img className="calc" src={calculator} alt="calculator" />
        </div>
        <Form />
      </header>
    </div>
  );
}

export default App;
