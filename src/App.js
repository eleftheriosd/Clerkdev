import { Fragment, useEffect, useState } from "react";
import "./App.css";

import CardContainer from "./components/CardContainer";

function App() {
  const [color, setColor] = useState("fff");

  const [data, setData] = useState("");

  const [usersToRender, setUsersToRender] = useState([{}]);

  const [loading, setLoading] = useState(true);

  const handleColorChange = (color) => {
    window.localStorage.setItem("color", color);
    setColor(color);
  };

  useEffect(() => {
    window.localStorage.getItem("color") &&
      setColor(window.localStorage.getItem("color"));

    fetch('https://randomuser.me/api/?response="json"&results=6')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (data) {
      //Mobile Render only 1 user
      if (window.innerWidth <= 760) {
        setUsersToRender([data.results[0]]);
      } else {
        // Desktop Render 3 users
        setUsersToRender([data.results[0], data.results[1], data.results[2]]);
      }

      setLoading(false);
    }
  }, [data]);

  return (
    <Fragment>
      <h1 className="text-center"> My Clerks</h1>
      <div className="text-center">
        <div className="d-flex justify-content-center align-items-center">
          <p>
            <b>Card Background color: </b>
          </p>
          <div className="ml-2 d-flex border p-1">
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
              style={{ background: `${color}`, border: "1px solid #333" }}
              className="color-choice border-0"
              onChange={(e) => {
                handleColorChange(e.target.value);
              }}
              value={color}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <CardContainer
          usersToRender={usersToRender}
          loading={loading}
          color={color}
        />
      </div>
    </Fragment>
  );
}

export default App;
