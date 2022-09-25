import React, { Fragment, useEffect, useState } from "react";
import "./App.css";

import CardContainer from "./components/CardContainer";

function App() {
  const [color, setColor] = useState("fff");

  const handleColorChange = (color) => {
    window.localStorage.setItem("color", color);
    setColor(color);
  };

  useEffect(() => {
    window.localStorage.getItem("color") &&
      setColor(window.localStorage.getItem("color"));
  }, []);

  return (
    <Fragment>
      <h1 className="text-center"> My Clerks</h1>
      <div className="text-center">
        <div className="d-flex justify-content-center align-items-center">
          <p>
            <b>Card Background color: </b>
          </p>
          <div className="ml-2 d-flex border-light-gray p-1">
            <input
              type="text"
              className="border-0 pl-1 outline-0"
              value={color}
              onChange={(e) => {
                handleColorChange(e.target.value);
              }}
            />
            <input
              type="color"
              name="card-color"
              style={{ background: `${color}` }}
              className="color-choice border-0 border-light-gray"
              onChange={(e) => {
                handleColorChange(e.target.value);
              }}
              value={color}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <CardContainer color={color} />
      </div>
    </Fragment>
  );
}

export default App;
