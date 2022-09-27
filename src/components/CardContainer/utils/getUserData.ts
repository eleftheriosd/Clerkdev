import { getUsersDataApi } from "./api";
import { normalizeUserData } from "./normalizers";
import {
  IGetUserDataApiParams,
  IResponseJsonData,
  IUserDataNorm,
} from "../../types";

export const getUserData = async (
  apiRequestData?: IGetUserDataApiParams
): Promise<IUserDataNorm[]> => {
  const userDataAPIResponse: IResponseJsonData = await getUsersDataApi(
    apiRequestData
  );
  const normalizedUserData: IUserDataNorm[] =
    normalizeUserData(userDataAPIResponse);
  return normalizedUserData;
};
