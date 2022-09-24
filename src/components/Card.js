import React from "react";
import imagePlaceHolder from "../images/user-placeholder.png";

const Card = ({ name, email, phone, picture, location, color }) => {
  return (
    <div className={`pb-2 mx-3 bg-${color ? color : "blue"}`}>
      <img
        className="w-20 pt-2 d-flex mx-auto"
        src={`${picture ? picture : imagePlaceHolder}`}
        alt={`${name ? name : "User picture"}`}
      />
      <div className="border mx-3 mt-2">
        <p className="pl-3">Name: {name ? name : "UserName"}</p>
      </div>
      <div className="border mx-3 mt-2">
        <p className="pl-3">Email: {email ? email : "User Email"}</p>
      </div>
      <div className="border mx-3 mt-2">
        <p className="pl-3">Phone: {phone ? phone : "Phone Number"}</p>
      </div>
      <div className="border mx-3 mt-2">
        <p className="pl-3">
          Location: {location ? location : "User Location"}
        </p>
      </div>
    </div>
  );
};

export default Card;
