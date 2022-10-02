import React, { ReactElement } from "react";
import imagePlaceHolder from "../../images/user-placeholder.png";

import { ICardProps } from "./types";

const Card: React.FC<ICardProps> = ({ user, color }): ReactElement => {
  const { name, email, phone, picture, location } = user;
  return (
    <div className="pb-2 sm:mx-3 mx-1 bg-white border-2 border-light-gray h-80">
      <img
        className="flex mx-auto rounded-full border-2 border-light-gray mt-3"
        height="55"
        width="55"
        src={`${picture.medium ?? imagePlaceHolder}`}
        alt={`${name ?? "User picture"}`}
      />
      <div
        className="border-2 border-light-gray mx-3 mt-3"
        style={{ backgroundColor: `${color ?? "white"}` }}
      >
        <p className="px-3 py-2">
          {name ? `${name.title} ${name.first} ${name.last}` : "UserName"}
        </p>
      </div>
      <div
        className="border-2 border-light-gray mx-3 mt-3"
        style={{ backgroundColor: `${color ?? "white"}` }}
      >
        <p className="px-3 py-2">{email ?? "User Email"}</p>
      </div>
      <div
        className="border-2 border-light-gray mx-3 mt-3"
        style={{ backgroundColor: `${color ?? "white"}` }}
      >
        <p className="px-3 py-2">{phone ?? "Phone Number"}</p>
      </div>
      <div
        className="border-2 border-light-gray mx-3 mt-3"
        style={{ backgroundColor: `${color ?? "white"}` }}
      >
        <p className="px-3 py-2">
          {location ? `${location.country}, ${location.city}` : "User Location"}
        </p>
      </div>
    </div>
  );
};

export default Card;
