import { getUsersDataApi } from "./api";
import { normalizeUserData } from "./normalizers";
import { IResponseJsonData, IUserDataNorm } from "../../types";

export const getUserData = async (): Promise<IUserDataNorm[]> => {
  const userDataAPIResponse: IResponseJsonData = await getUsersDataApi();
  const normalizedUserData: IUserDataNorm[] =
    normalizeUserData(userDataAPIResponse);
  return normalizedUserData;
};
