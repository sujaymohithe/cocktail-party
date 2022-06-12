import React, { useState } from "react";
import localStorageService from "../../services/localStorageService";
import { Ingredient } from "../../types/types";
import { isDateValid } from "../../utils/functions";
import ModalDialog from "../Modal/Modal";
import {
  invalid_date_msg,
  duplicate_ingredient,
  mandatory_ingredient_name,
  ingredients
} from "../../AppConstants";

interface Props {
  onClose: () => void;
  onSave: (ingredientDetails: Ingredient) => void;
}

const AddIngredients = ({ onClose, onSave }: Props) => {
  const [error, setError] = useState<string[]>([]);
  const [isAlcoholic, setIsAlcoholic] = useState(false);
  const [ingredientName, setIngredientName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleOnChangeName = (event: React.BaseSyntheticEvent) => {
    setIngredientName(event.target.value);
  };

  const handleOnChangeCheckBox = () => {
    setIsAlcoholic(!isAlcoholic);
  };

  const handleOnChangeExpiryDate = (event: React.BaseSyntheticEvent) => {
    setExpiryDate(event.target.value);
  };

  const handleAddNewIngredient = () => {
    const storeIngredients: Ingredient[] =
      localStorageService.getItem(ingredients);
    const availableIngredients = storeIngredients.map((i) => i.name.toLowerCase());
    if (!ingredientName.trim()) {
      setError([mandatory_ingredient_name]);
      return;
    }
    if (expiryDate && !isDateValid(expiryDate)) {
      setError([invalid_date_msg]);
      return;
    }
    const isIngredientAlreadyAdded = availableIngredients.filter(
      (ingredient) => ingredientName.trim().toLowerCase() === ingredient.toLowerCase()
    );
    if (isIngredientAlreadyAdded.length > 0) {
      setError([duplicate_ingredient]);
      return;
    }
    const newIngredient: Ingredient = {
      name: ingredientName,
      alcoholic: isAlcoholic,
      expiryDate: expiryDate,
    };
    onSave(newIngredient);
  };

  return (
    <ModalDialog
      title="Add New Ingredient"
      onSave={handleAddNewIngredient}
      onClose={onClose}
    >
      <div className="add-container">
        <div className="input-item">
          <span>Ingredient Name<span className="mandatory">*</span>: </span>
          <input
            type="text"
            value={ingredientName}
            placeholder="Enter a name"
            onChange={handleOnChangeName}
          ></input>
        </div>
        <div className="input-item">
          <span>Is Alcoholic: </span>
          <div className="input-checkbox">
            <input
              type="checkbox"
              defaultChecked={isAlcoholic}
              onChange={handleOnChangeCheckBox}
            ></input>
          </div>
        </div>
        <div className="input-item">
          <span>Expiry Date: </span>
          <input
            type="text"
            value={expiryDate}
            placeholder="dd.mm.yyyy"
            onChange={handleOnChangeExpiryDate}
          ></input>
        </div>
      </div>
      {error.length > 0 && (
        <div className="error">
          <span>{error.join(", ")}</span>
        </div>
      )}
    </ModalDialog>
  );
};

export default AddIngredients;
