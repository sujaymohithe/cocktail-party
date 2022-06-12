import React, { useEffect, useState } from "react";
import CocktialList from "../components/Cocktail/CocktialList";
import APIService from "../services/APIService";
import { Cocktail } from "../types/types";

const CocktailsPage = () => {
  const [myCocktails, setMyCocktails] = useState<Cocktail[]>([]);
  useEffect(() => {
    APIService.getCocktails().then((data) => {
      if (data) {
        setMyCocktails(data);
      }
    });
  }, []);

  return <CocktialList data={myCocktails} />;
};

export default CocktailsPage;
