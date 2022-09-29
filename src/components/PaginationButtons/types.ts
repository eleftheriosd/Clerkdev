import { MouseEventHandler } from "react";

export interface IPaginationButtonsProps {
  color: string;
  loading: boolean;
  handlePrevious: MouseEventHandler<HTMLButtonElement>;
  handleNext: MouseEventHandler<HTMLButtonElement>;
}
