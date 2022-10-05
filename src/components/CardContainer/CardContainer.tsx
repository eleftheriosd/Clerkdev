import React, {
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Card from "../Card/Card";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import { IGetUserDataApiParams, IUserDataNorm } from "../types";
import { ICardContainerProps } from "./types";
import { useSwipeable } from "react-swipeable";
import Spinner from "../../images/spinner.svg";
import { getUsersToRender } from "./utils/getUsersToRender";
import { handleLoading } from "./utils/handleLoading";
import { useHandleApiRequest } from "./hooks/useHandleApiRequest";

const CardContainer: React.FC<ICardContainerProps> = ({
  color,
}): ReactElement => {
  // State for storing data fetched as a whole
  const [loading, setLoading] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<number>(1);
  // Default API Request Values
  const [apiRequestParameters, setApiRequestData] =
    useState<IGetUserDataApiParams>({
      results: 21,
      page: 1,
    });

  const data = useHandleApiRequest(apiRequestParameters);

  const [usersToRender, setUsersToRender] = useState<IUserDataNorm[]>([]);

  // Effect responsible for Handling API page
  useEffect(() => {
    let { results, page } = apiRequestParameters;

    if (results && page) {
      // Default case 1 result per page
      // On Desktop serve 3 results per page
      if (results * page < activePage * (window?.innerWidth > 760 ? 3 : 1)) {
        // Above if condition indicates that we need to
        // increase the page number when hitting the API
        // in order to get data from the next page
        setApiRequestData({
          ...apiRequestParameters,
          page: page + 1,
        });
      }
    }
  }, [apiRequestParameters, activePage]);

  // Effect that Renders users based on Active page
  useEffect(() => {
    if (data) {
      setUsersToRender(getUsersToRender(data, activePage));
    }
  }, [data, activePage]);

  // Effect that triggers Loading Spinner based On UsersToRender Status
  useEffect(() => {
    setLoading(handleLoading(usersToRender));
  }, [usersToRender]);

  const handlePrevious = useCallback(() => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  }, [activePage]);

  const handleNext = useCallback(() => {
    setActivePage(activePage + 1);
  }, [activePage]);

  // Used Mainly on Mobile, Could prevent triggering on Desktop
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleNext();
    },
    onSwipedRight: () => {
      handlePrevious();
    },
  });

  const PaginationB = useMemo((): ReactElement => {
    return (
      <PaginationButtons
        loading={loading}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    );
  }, [handleNext, handlePrevious, loading]);

  return (
    <div className="mt-10 pt-10">
      {loading ? (
        <Fragment>
          {/* Could Also be a Custom Component To Apply more logic */}
          <img src={Spinner} className="mx-auto" alt="Loading Data..." />
        </Fragment>
      ) : (
        <div className="md:max-w-6xl gap-5 lg:columns-3 mx-auto">
          {usersToRender.map((user: IUserDataNorm) => {
            return (
              <div {...handlers} key={user.id?.value ?? user?.email}>
                <Card user={user} color={color} />
              </div>
            );
          })}
        </div>
      )}
      <>{PaginationB}</>
    </div>
  );
};

export default CardContainer;
