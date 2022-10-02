import React, { ReactElement } from "react";
import { IPaginationButtonsProps } from "./types";

const PaginationButtons: React.FC<IPaginationButtonsProps> = ({
  loading,
  color,
  handlePrevious,
  handleNext,
}): ReactElement => {
  if (loading) {
    return <></>;
  }
  return (
    <div className="flex justify-center">
      <button
        className="prev arrow left bg-white"
        style={{ borderColor: color }}
        onClick={handlePrevious}
      ></button>
      <button
        className="next arrow right bg-white"
        style={{ borderColor: color }}
        onClick={handleNext}
      ></button>
    </div>
  );
};

export default PaginationButtons;
