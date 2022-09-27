// For a complete list see https://randomuser.me/documentation
// Currently supported API params are:
export interface IGetUserDataApiParams {
  results?: number;
  page?: number;
  seed?: number;
  fields?: Array<IUserFields>;
  noinfo?: string;
}

type IUserFields =
  | "gender"
  | "name"
  | "location"
  | "email"
  | "login"
  | "registered"
  | "dob"
  | "phone"
  | "cell"
  | "id"
  | "picture"
  | "nat";

export interface IResponseJsonData {
  info?: IGetUsersApiInfoDetails;
  results: IUserData[];
}

interface IGetUsersApiInfoDetails {
  page: number;
  results: number;
  seed: string;
  version: string;
}

// User Schema
interface ICoordinates {
  latitude: string;
  longitude: string;
}

interface IStreet {
  name: string;
  number: Number;
}

interface ITimezone {
  description: "string";
  offset: "string";
}

interface IUserLocation {
  city: string;
  coordinates: ICoordinates;
  country: string;
  postcode: number;
  state: string;
  street: IStreet;
  timezone: ITimezone;
}

interface IUserId {
  name: string;
  value: string;
}

interface IUserFullName {
  first: string;
  last: string;
  title: string;
}

interface IUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface IUserData {
  id: IUserId;
  email: string;
  name: IUserFullName;
  picture: IUserPicture;
  phone: string;
  location: IUserLocation;
}

// Normalized User Schema

type IUserIdNorm = Omit<IUserId, "name">;

type IUserPictureNorm = Pick<IUserPicture, "medium">;

type IUserLocationNorm = Pick<IUserLocation, "city" | "country">;

export interface IUserDataNorm {
  id: IUserIdNorm;
  email: string;
  name: IUserFullName;
  picture: IUserPictureNorm;
  phone: string;
  location: IUserLocationNorm;
}
