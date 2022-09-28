import React, { Fragment, useEffect, useState } from "react";
import Card from "../Card/Card";
import { getUserData } from "../CardContainer/utils/getUserData";
import { IGetUserDataApiParams, IUserDataNorm } from "../types";
import { ICardContainerProps } from "./types";
import { useSwipeable } from "react-swipeable";
import Spinner from "../../images/spinner.svg";

const CardContainer = ({ color }: ICardContainerProps) => {
  const [data, setData] = useState<IUserDataNorm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<number>(1);
  // Default API Request Values
  const [apiRequestData, setApiRequestData] = useState<IGetUserDataApiParams>({
    results: 21,
    page: 1,
  });

  const [usersToRender, setUsersToRender] = useState<IUserDataNorm[]>([]);
  let resultsPerPage = 1;

  if (window.innerWidth > 760) {
    resultsPerPage = 3;
  }

  // Effect that makes API request to Fetch Data
  useEffect(() => {
    getUserData(apiRequestData)
      .then((resData: IUserDataNorm[]) => {
        let tempData = data.concat(resData);
        setData(tempData);
      })
      .catch((err) => {
        // Load Error Page Or Alert User
        console.log(err);
      });
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiRequestData]);

  // Effect responsible for Handling API page
  useEffect(() => {
    if (apiRequestData.results && apiRequestData.page) {
      if (
        apiRequestData.results * apiRequestData.page <
        activePage * resultsPerPage
      ) {
        setApiRequestData({ ...apiRequestData, page: apiRequestData.page + 1 });
      }
    }
  }, [apiRequestData, resultsPerPage, activePage]);

  // Effect that Renders users based on Active page
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

  // Effect that triggers Loading Spinner based On UsersToRender Status
  useEffect(() => {
    if (usersToRender.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [usersToRender]);

  const handlePrevious = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const handleNext = () => {
    setActivePage(activePage + 1);
  };

  // Used Mainly on Mobile, Could prevent triggering on Desktop
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleNext();
    },
    onSwipedRight: () => {
      handlePrevious();
    },
  });

  return (
    <div>
      <div className="mt-5 d-flex justify-content-center">
        {loading ? (
          <Fragment>
            {/* Could Also be a Custom Component To Apply more logic */}
            <img src={Spinner} alt="Loading Data..." />
          </Fragment>
        ) : (
          usersToRender.map((user: IUserDataNorm) => {
            return (
              <div
                {...handlers}
                key={user.id?.value ?? user?.email}
                className="col"
              >
                <Card user={user} color={color} />
              </div>
            );
          })
        )}
      </div>
      {!loading ? (
        <div className="d-flex justify-content-center">
          <button
            className="prev arrow left bg-white"
            style={{ borderColor: color }}
            onClick={handlePrevious}
          ></button>
          <button
            className="next arrow right bg-white"
            style={{ borderColor: color }}
            onClick={handleNext}
          ></button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardContainer;
