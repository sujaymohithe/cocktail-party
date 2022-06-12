export interface Ingredient {
  alcoholic: boolean;
  name: string;
  expiryDate?: string;
}

export interface Cocktail {
  name : string;
  ingredients: string[];

}

export type ModalSize = "sm" | "lg" | "xl" | "md";
