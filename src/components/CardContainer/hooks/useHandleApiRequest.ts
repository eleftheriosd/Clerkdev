import { Reducer, useEffect, useReducer } from "react";
import { IGetUserDataApiParams, IUserDataNorm } from "../../types";
import { getUserData } from "../utils/getUserData";

import { IuseHandleApiRequestReducerAction } from "./types";

const initialState: IUserDataNorm[] = [];

const reducer = (
  state: IUserDataNorm[],
  action: IuseHandleApiRequestReducerAction
) => {
  switch (action.type) {
    case "update":
      // On new requests push data to existing state
      return state.concat(action.state);
    default:
      throw new Error();
  }
};

export const useHandleApiRequest = (
  apiRequestParameters: IGetUserDataApiParams
) => {
  const [state, dispatch] = useReducer<
    Reducer<IUserDataNorm[], IuseHandleApiRequestReducerAction>
  >(reducer, initialState);
  // Effect that makes API request to Fetch Data
  useEffect(() => {
    const handleDataUpdate = async (
      apiRequestParameters: IGetUserDataApiParams
    ) => {
      try {
        let resData: IUserDataNorm[] = await getUserData(apiRequestParameters);
        dispatch({ state: resData, type: "update" });
      } catch (err) {
        // Load Error Page Or Alert User
        console.log(err);
      }
    };

    handleDataUpdate(apiRequestParameters);
  }, [apiRequestParameters]);

  return state;
};
