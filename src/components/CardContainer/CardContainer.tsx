import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Pagination from "react-js-pagination";
import { getUserData } from "../CardContainer/utils/getUserData";
import { IUserDataNorm } from "../types";
import { ICardContainerProps } from "./types";

const CardContainer = ({ color }: ICardContainerProps) => {
  const [data, setData] = useState<IUserDataNorm[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [activePage, setActivePage] = useState<number>(1);

  const [usersToRender, setUsersToRender] = useState<IUserDataNorm[]>([]);

  useEffect(() => {
    getUserData()
      .then((data: IUserDataNorm[]) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        // Load Error Page Or Alert User
        console.log(err);
      });
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    if (data) {
      let dataUsersToRender: IUserDataNorm[] = data.filter(
        (item: object, index: number) => {
          if (window.innerWidth > 760) {
            // Desktop
            return (
              index >= activePage * 2 + activePage - 3 &&
              index <= activePage * 2 + activePage - 1
            );
          } else {
            // Mobile
            return index === activePage - 1;
          }
        }
      );
      setUsersToRender(dataUsersToRender);
    }
  }, [data, activePage]);

  useEffect(() => {
    if (usersToRender) {
      setLoading(false);
    }
  }, [usersToRender]);

  return (
    <div>
      <div className="mt-5 d-flex justify-content-center">
        {loading
          ? "Loading..."
          : usersToRender.map((user: IUserDataNorm) => {
              return (
                <div key={user.id?.value ?? user?.email} className="col">
                  <Card user={user} color={color} />
                </div>
              );
            })}
      </div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={window.innerWidth <= 760 ? 1 : 3}
        totalItemsCount={data.length}
        pageRangeDisplayed={1}
        hideFirstLastPages={true}
        onChange={(pageNumber) => handlePageChange(pageNumber)}
      />
    </div>
  );
};

export default CardContainer;
