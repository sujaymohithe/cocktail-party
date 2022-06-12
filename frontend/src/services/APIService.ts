import { Ingredient, Cocktail } from "../types/types";

class APIService {
  /**
   *get all ingredients and each ingredients details
   */
  static getIngredients(): Promise<Ingredient[] | null> {
    return fetch(
      "https://us-central1-nexible-code.cloudfunctions.net/ingredients"
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  static getCocktails(): Promise<Cocktail[] | null> {
    return fetch(
      "https://us-central1-nexible-code.cloudfunctions.net/cocktails"
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
}

export default APIService;
