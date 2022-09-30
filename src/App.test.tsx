import { render, screen } from "@testing-library/react";
import CardContainer from "./components/CardContainer/CardContainer";
import { getUsersDataApi } from "./components/CardContainer/utils/api";
import { IResponseJsonData, IUserData, IUserPicture } from "./components/types";

test("Get Users Api All Fields", async () => {
  let responseAllFieldsData: IResponseJsonData = await getUsersDataApi({
    results: 1,
  });
  let record: IUserData = responseAllFieldsData.results[0];
  // Could match exact shcema to be sure about inc fields
  // Could modularize API responses with variables
  expect(record).toHaveProperty("name");
  expect(record).toHaveProperty("location");
  expect(record).toHaveProperty("email");
  expect(record).toHaveProperty("phone");
  expect(record).toHaveProperty("id");
  expect(record).toHaveProperty("picture");
});

test("Get Users Api Picture Field", async () => {
  let responseOnlyPictureData: IResponseJsonData = await getUsersDataApi({
    results: 1,
    fields: ["picture"],
  });

  let pictureRecord: IUserData = responseOnlyPictureData.results[0];

  // Check for picture values
  let pictureRecordData: IUserPicture =
    responseOnlyPictureData.results[0].picture;
  expect(pictureRecordData).toHaveProperty("large");
  expect(pictureRecordData).toHaveProperty("medium");
  expect(pictureRecordData).toHaveProperty("thumbnail");

  // Check to see if name is excluded
  expect(pictureRecord.name).toBeUndefined();
});

test("Render Card Container", () => {
  const cardContainerComponent = <CardContainer color={"#aaa"} />;
  render(cardContainerComponent);
  // Initaially render Spinner
  const loadingSpinner: HTMLImageElement =
    screen.getByAltText("Loading Data...");
  expect(loadingSpinner).toBeInTheDocument();
});
