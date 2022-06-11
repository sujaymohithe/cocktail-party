import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation/Navigation";
import APIService from "../services/APIService";
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
      <Container>
        <Navigation onSelectNav={handleNavSelection} />
        {selectedPage === Page.Cocktails && <p>Cocktails</p>}
        {selectedPage === Page.Ingredients && <IngredientsPage />}
      </Container>
    </div>
  );
};

export default CocktailParty;
