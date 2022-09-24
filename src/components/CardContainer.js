import React from "react";
import Card from "./Card";

const CardContainer = ({ loading, usersToRender, color }) => {
  return (
    <div className="mt-5 d-flex justify-content-center">
      {loading
        ? "Loading..."
        : usersToRender.map((user) => {
            return (
              <Card
                className="col"
                key={user.id.value}
                user={user}
                color={color}
              />
            );
          })}
    </div>
  );
};

export default CardContainer;
