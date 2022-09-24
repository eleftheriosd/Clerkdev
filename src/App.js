import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [color, setColor] = useState("red");

  useEffect(() => {
    window.localStorage.setItem("color", color);
  }, [color]);

  return (
    <Fragment>
      <h1 className="text-center"> My Clerks</h1>
      <div className="text-center">
        <div className="d-flex justify-content-center">
          <p> Card Background color</p>
          <input type="" name="Card-color" value={color} />
        </div>
      </div>
      <div className="mt-5">
        <Card name={"Foo"} color={color} />
      </div>
    </Fragment>
  );
}

export default App;
