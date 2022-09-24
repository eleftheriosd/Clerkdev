import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [color, setColor] = useState("red");

  const [data, setData] = useState("");

  const [usersToRender, setUsersToRender] = useState([{}]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.localStorage.setItem("color", color);
  }, [color]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?response="json"&results=3')
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
        <div className="d-flex justify-content-center">
          <p> Card Background color</p>
          <input type="" name="Card-color" value={color} />
        </div>
      </div>
      <div className="mt-5">
        {loading
          ? "Loading..."
          : usersToRender.map((user) => {
              return <Card key={user.id.value} user={user} color={color} />;
            })}
      </div>
    </Fragment>
  );
}

export default App;
