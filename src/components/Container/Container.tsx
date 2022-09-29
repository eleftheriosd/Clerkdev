import React, { useEffect, useState } from "react";
import CardContainer from "../CardContainer/CardContainer";

const Container = () => {
  // Default Value #aaa
  const [color, setColor] = useState<string>("#aaa");

  useEffect(() => {
    window.localStorage.getItem("color") &&
      setColor(window.localStorage.getItem("color") as string);
  }, []);

  const handleColorChange = (color: string) => {
    window.localStorage.setItem("color", color);
    setColor(color);
  };

  return (
    <div className="container">
      <h1 className="text-center"> My Clerks</h1>
      <div className="text-center">
        <div className="d-sm-flex justify-content-center align-items-center">
          <p>
            <b>Card Background color: </b>
          </p>
          <div className="ml-2 d-i-flex border-light-gray p-1">
            <input
              type="text"
              className="border-0 pl-1 outline-0"
              value={color}
              onChange={(e) => {
                handleColorChange(e.target.value);
              }}
              // onKeyDown={(e) => {
              // Could also add custom validation on typing
              // }}
            />
            <input
              type="color"
              name="card-color"
              style={{ background: `${color}` }}
              className="color-choice border-0"
              onChange={(e) => {
                handleColorChange(e.target.value);
              }}
              value={color}
            />
          </div>
        </div>
      </div>
      <CardContainer color={color} />
    </div>
  );
};

export default Container;
