import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pagination from "react-js-pagination";

const CardContainer = ({ color }) => {
  const [data, setData] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://randomuser.me/api/?response="json"&results=9')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  //   Pagination
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  //Users to Render Logic

  const [usersToRender, setUsersToRender] = useState("");

  useEffect(() => {
    if (data) {
      let usersToRender = data.results.filter((item, index) => {
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
      });
      setUsersToRender(usersToRender);
    }
  }, [data, activePage]);

  useEffect(() => {
    if (usersToRender) {
      setLoading(false);
    }
  }, [usersToRender]);

  return (
    <div className="mt-5 d-flex justify-content-center">
      <div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={window.innerWidth <= 760 ? 1 : 3}
          totalItemsCount={data ? data.results.length : 0}
          pageRangeDisplayed={1}
          hideFirstLastPages={true}
          onChange={(pageNumber) => handlePageChange(pageNumber)}
        />
      </div>

      {loading
        ? "Loading..."
        : usersToRender.map((user) => {
            return (
              <Card
                className="col"
                key={user.id.value ? user.id.value : user.registered.date}
                user={user}
                color={color}
              />
            );
          })}
    </div>
  );
};

export default CardContainer;
