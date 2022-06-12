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

const EditIngredient = ({ ingredient, onSave, onClose }: Props) => {
  const [editedExpiryDate, setEditedExpiryDate] = useState(
    ingredient.expiryDate
  );
  const [isError, setIsError] = useState(false);

  const handleOnEditSave = () => {
    //expiry date not mandatory
    if (!editedExpiryDate) {
      onClose();
    }
    //validate expiry date if entered
    const result = editedExpiryDate && isDateValid(editedExpiryDate);
    if (result) {
      const editedIngredientDetails = ingredient;
      editedIngredientDetails.expiryDate = editedExpiryDate;
      onSave(editedIngredientDetails);
    } else {
      setIsError(true);
      return;
    }
  };

  const handleOnChangeExpiryDate = (event: React.BaseSyntheticEvent) => {
    setEditedExpiryDate(event.target.value);
  };

  return (
    <ModalDialog
      title={ingredient.name}
      onSave={handleOnEditSave}
      onClose={onClose}
    >
      <div className="edit-container">
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
