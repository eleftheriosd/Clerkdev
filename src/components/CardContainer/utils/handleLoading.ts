import { IUserDataNorm } from "../../types";

export const handleLoading = (usersToRender: IUserDataNorm[]): boolean => {
  let loading;
  if (usersToRender.length > 0) {
    loading = false;
  } else {
    loading = true;
  }
  return loading;
};
