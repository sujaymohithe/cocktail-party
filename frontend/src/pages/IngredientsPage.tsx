import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddIngredients from "../components/Ingredients/AddIngredients";
import EditIngredient from "../components/Ingredients/EditIngredient";
import IngredientList from "../components/Ingredients/IngredientList";
import APIService from "../services/APIService";
import localStorageService from "../services/localStorageService";
import { Ingredient } from "../types/types";
import { ingredients } from "../AppConstants";

/**
 * Page to render inventory/ingredients
 * @returns JSX
 */
const IngredientsPage = () => {
  const [myIngredients, setMyIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<
    Ingredient | undefined
  >(undefined);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const storedIngredients = localStorageService.getItem(ingredients);
    //if local storage is empty
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

  /**
   * Method to setSelectedIngredient on click of edit ingredient
   * @param ingredient : selected Ingredient
   */
  const handleOnEditIngredient = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
  };

  /**
   * Method to delete Ingredient on click of delete ingredient
   * @param deletedIngredient : Ingredient to be deleted
   */
  const handleOnDeleteIngredient = (deletedIngredient: Ingredient) => {
    const otherIngredients = myIngredients.filter(
      (ingredient: Ingredient) => ingredient.name !== deletedIngredient.name
    );
    setMyIngredients(otherIngredients);
    localStorageService.setItem(ingredients, otherIngredients);
  };

  /**
   * Method to close Edit Ingredient modal and clear selected Ingredient
   */
  const handleOnCloseEditModal = () => {
    setSelectedIngredient(undefined);
  };

  /**
   * Method to save new Ingredient or edited Ingredient
   * @param ingredientDetails newly added Ingredient or existing edited Ingredient
   */
  const handleOnSaveIngredient = (ingredientDetails: Ingredient) => {
    let storedIngredients: Ingredient[] =
      localStorageService.getItem(ingredients);
    const selectedIndex = storedIngredients.findIndex(
      (ingredient) => ingredient.name === ingredientDetails.name
    );
    //in case of edit existing ingredient
    if (selectedIndex > -1) {
      storedIngredients[selectedIndex] = ingredientDetails;
    } else {
      //in case of addm, push new ingredient to first index
      storedIngredients = [ingredientDetails, ...storedIngredients];
    }
    setMyIngredients(storedIngredients);
    localStorageService.setItem(ingredients, storedIngredients);
    //clear selected ingredient and to auto close edit modal
    setSelectedIngredient(undefined);
    setShowAddModal(false);
  };

  /**
   * Method to show modal on Add new ingredient
   */
  const handleAddNewIngredient = () => {
    setShowAddModal(true);
  };

  /**
   * Method to close modal of Add new ingredient
   */
  const handleOnCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div>
      <div className="add-item">
        <Button variant="primary" onClick={handleAddNewIngredient}>
          Add New Ingredient
        </Button>
      </div>
      <IngredientList
        data={myIngredients}
        onEditIngredient={handleOnEditIngredient}
        onDeleteIngredient={handleOnDeleteIngredient}
      />

      {selectedIngredient && (
        <EditIngredient
          ingredient={selectedIngredient}
          onSave={handleOnSaveIngredient}
          onClose={handleOnCloseEditModal}
        ></EditIngredient>
      )}
      {showAddModal && (
        <AddIngredients
          onClose={handleOnCloseAddModal}
          onSave={handleOnSaveIngredient}
        />
      )}
    </div>
  );
};

export default IngredientsPage;
