import React from "react";
import { useAppState } from "../../store/app-state";
import Category from "./Category";
import CategoriesWrapper from "../utilsComponents/CategoriesWrapper";
import LinkText from "../utilsComponents/LinkText";

export default function FavouriteCategories({ handleTabChange }) {
  const [{ favourites }] = useAppState();
  return (
    <CategoriesWrapper>
      {favourites && !!favourites.length ? (
        favourites
          .sort((a, b) => b.addDate - a.addDate)
          .map(favourite => (
            <Category fav={true} key={favourite.id} category={favourite} />
          ))
      ) : (
        <>
          <h4 style={{ flex: "1 0 100%", textAlign: "center" }}>
            You dont have favourite categories yet
          </h4>
          <h5 style={{ flex: "1 0 100%", textAlign: "center" }}>
            you can add it on the{" "}
            <LinkText
              style={{ cursor: "pointer" }}
              onClick={() => handleTabChange("1")}
            >
              All categories tab!
            </LinkText>
          </h5>
        </>
      )}
    </CategoriesWrapper>
  );
}
