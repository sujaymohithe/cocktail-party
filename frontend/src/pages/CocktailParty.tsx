import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation/Navigation";
import APIService from "../services/APIService";
import CocktailsPage from "./CocktailsPage";
import IngredientsPage from "./IngredientsPage";

export enum Page {
  Cocktails,
  Ingredients,
}

const CocktailParty = () => {
  const [selectedPage, setSelectedPage] = useState(Page.Cocktails);

  /**
   * handles navigation selection
   * @param page Page Enum - Cocktails, Ingredients
   */
  const handleNavSelection = (page: number) => {
    setSelectedPage(page);
  };
  return (
    <div>
      <div className="main-container">
        <Navigation onSelectNav={handleNavSelection} />
        <div className="body-container">
          {selectedPage === Page.Cocktails && <CocktailsPage />}
          {selectedPage === Page.Ingredients && <IngredientsPage />}
        </div>
      </div>
    </div>
  );
};

export default CocktailParty;
