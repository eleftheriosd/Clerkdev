import { IUserDataNorm } from "../../types";

export const getUsersToRender = (
  data: IUserDataNorm[],
  activePage: number
): IUserDataNorm[] => {
  return data.filter((item: object, index: number) => {
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
};
