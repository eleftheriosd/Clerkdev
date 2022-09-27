import { IGetUserDataApiParams, IResponseJsonData } from "../../types";

export const getUsersDataApi = (
  data?: IGetUserDataApiParams
): Promise<IResponseJsonData> =>
  fetch(
    `https://randomuser.me/api/?response="json"&page=${data?.page ?? 1}&${
      data?.seed ?? 1
    }&results=${data?.results ?? 9}&${
      Array.isArray(data?.fields)
        ? "inc=" + data?.fields.join(",")
        : "inc=name,email,picture,phone,location,id"
    }${data?.noinfo ? "&" + data?.noinfo : ""}`
  ).then((response): IResponseJsonData => handleUsersDataApiResponse(response));

const handleUsersDataApiResponse = (response: any): IResponseJsonData => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
