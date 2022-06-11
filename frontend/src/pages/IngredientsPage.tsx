import React, { useEffect, useState } from "react";
import IngredientList from "../components/Ingredients/IngredientList";
import APIService from "../services/APIService";
import { Ingredient } from "../types/types";

const IngredientsPage = () => {
  const [myIngredients, setMyIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {
    APIService.getIngredients().then((data) => {
      data && setMyIngredients(data);
    });
  }, []);

  return (
    <div>
      <IngredientList data={myIngredients} />
    </div>
  );
};

export default IngredientsPage;
