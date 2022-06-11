class APIService {
  /**
   *get all ingredients and each ingredients details
   */
  static getIngredients(): Promise<Ingredients[] | null> {
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
}

export default APIService;
