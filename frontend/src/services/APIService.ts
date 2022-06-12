import { Ingredient, Cocktail } from "../types/types";
import { requestUrl } from "../utils/network";

class APIService {
  /**
   * Method to get all ingredients with details
   * @returns Promise : all ingredients
   */
  static getIngredients(): Promise<Ingredient[] | null> {
    return fetch(`${requestUrl}ingredients`)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  /**
   * Method to get all cocktails with it's ingredients
   * @returns Promise : all cocktails
   */
  static getCocktails(): Promise<Cocktail[] | null> {
    return fetch(`${requestUrl}/cocktails`)
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
