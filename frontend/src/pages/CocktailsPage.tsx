import React, { useEffect, useState } from "react";
import CocktialList from "../components/Cocktail/CocktialList";
import APIService from "../services/APIService";
import localStorageService from "../services/localStorageService";
import { Cocktail, Ingredient } from "../types/types";
import { ingredients } from "../AppConstants";

/**
 * Page to render Cocktails
 * @returns JSX
 */
const CocktailsPage = () => {
  const [myCocktails, setMyCocktails] = useState<Cocktail[]>([]);
  const [myIngredients, setMyIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    APIService.getCocktails().then((data) => {
      if (data) {
        setMyCocktails(data);
      }
    });

    const storedIngredients = localStorageService.getItem(ingredients);
    if (Object.keys(storedIngredients).length < 1) {
      APIService.getIngredients().then((data) => {
        //initially set localStorage
        if (data) {
          localStorageService.setItem(ingredients, data);
          setMyIngredients(data);
        }
      });
    } else {
      setMyIngredients(storedIngredients);
    }
  }, []);

  return <CocktialList data={myCocktails} availableIngredients={myIngredients}/>;
};

export default CocktailsPage;
