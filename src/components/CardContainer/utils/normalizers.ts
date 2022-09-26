import { IResponseJsonData, IUserData, IUserDataNorm } from "../../types";

export const normalizeUserData = (
  responseData: IResponseJsonData
): IUserDataNorm[] =>
  //   const { results } = responseData;
  responseData.results.map((userData: IUserData) => {
    return {
      ...userData,
      id: {
        value: userData.id.value,
      },
      location: {
        city: userData.location.city,
        country: userData.location.country,
      },
      picture: {
        medium: userData.picture.medium,
      },
      //Ommit
    };
  });
