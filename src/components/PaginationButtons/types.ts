import { MouseEventHandler } from "react";

export interface IPaginationButtonsProps {
  loading: boolean;
  handlePrevious: MouseEventHandler<HTMLButtonElement>;
  handleNext: MouseEventHandler<HTMLButtonElement>;
}
