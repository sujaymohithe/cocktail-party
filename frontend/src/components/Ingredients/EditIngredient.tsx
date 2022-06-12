import React, { useState } from "react";
import { Ingredient } from "../../types/types";
import { isDateValid } from "../../utils/functions";
import ModalDialog from "../Modal/Modal";
import "./Ingredients.scss";
import { invalid_date_msg } from "../../AppConstants";

interface Props {
  ingredient: Ingredient;
  onSave: (editedIngredientDetails: Ingredient) => void;
  onClose: () => void;
}

/**
 * Component to render Edit Ingredient Modal
 * @returns JSX
 */
const EditIngredient = ({ ingredient, onSave, onClose }: Props) => {
  const [editedExpiryDate, setEditedExpiryDate] = useState<string>(
    ingredient.expiryDate ?? ""
  );
  const [isAlcoholic, setIsAlcoholic] = useState(ingredient.alcoholic);
  const [isError, setIsError] = useState(false);

  const handleOnEditSave = () => {
    //validate expiry date if entered
    let isValidated = true;
    if (editedExpiryDate) {
      isValidated = isDateValid(editedExpiryDate);
    }
    if (isValidated) {
      const editedIngredientDetails = ingredient;
      editedIngredientDetails.expiryDate = editedExpiryDate;
      editedIngredientDetails.alcoholic = isAlcoholic;
      onSave(editedIngredientDetails);
    } else {
      setIsError(true); //default error on form is date in not in required format
      return;
    }
  };

  /**
   * Method to handle expiry date input change
   */
  const handleOnChangeExpiryDate = (event: React.BaseSyntheticEvent) => {
    setEditedExpiryDate(event.target.value);
  };

  /**
   * Method to handle isAlcoholic checkbox change
   */
  const handleOnChangeCheckBox = () => {
    setIsAlcoholic(!isAlcoholic);
  };

  return (
    <ModalDialog
      title={ingredient.name}
      onSave={handleOnEditSave}
      onClose={onClose}
    >
      <div className="edit-container">
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
            value={editedExpiryDate}
            placeholder="dd.mm.yyyy"
            onChange={handleOnChangeExpiryDate}
          ></input>
        </div>
      </div>
      {isError && (
        <div className="error">
          <span>{invalid_date_msg}</span>
        </div>
      )}
    </ModalDialog>
  );
};

export default EditIngredient;
