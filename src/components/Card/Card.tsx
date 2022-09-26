import React, { ReactElement } from "react";
import imagePlaceHolder from "../../images/user-placeholder.png";

import { CardProps } from "./types";

const Card: React.FC<CardProps> = ({ user, color }): ReactElement => {
  const { name, email, phone, picture, location } = user;
  return (
    <div className="pb-2 mx-3 col bg-white border-light-gray">
      <img
        className="pt-2 d-flex mx-auto radius-50"
        height="55"
        width="55"
        src={`${picture.medium ? picture.medium : imagePlaceHolder}`}
        alt={`${name ? name : "User picture"}`}
      />
      <div
        className="border-light-gray mx-3 mt-2"
        style={{ backgroundColor: `${color ? color : "white"}` }}
      >
        <p className="pl-3">
          {name ? `${name.title} ${name.first} ${name.last}` : "UserName"}
        </p>
      </div>
      <div
        className="border-light-gray mx-3 mt-2"
        style={{ backgroundColor: `${color ? color : "white"}` }}
      >
        <p className="pl-3">{email ? email : "User Email"}</p>
      </div>
      <div
        className="border-light-gray mx-3 mt-2"
        style={{ backgroundColor: `${color ? color : "white"}` }}
      >
        <p className="pl-3">{phone ? phone : "Phone Number"}</p>
      </div>
      <div
        className="border-light-gray mx-3 mt-2"
        style={{ backgroundColor: `${color ? color : "white"}` }}
      >
        <p className="pl-3">
          {location ? `${location.country}, ${location.city}` : "User Location"}
        </p>
      </div>
    </div>
  );
};

export default Card;
