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

  const handleOnEditIngredeint = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleOnDeleteIngredeint = (deletedIngredient: Ingredient) => {
    const otherIngredients = myIngredients.filter(
      (ingredient: Ingredient) => ingredient.name !== deletedIngredient.name
    );
    setMyIngredients(otherIngredients);
    localStorageService.setItem(ingredients, otherIngredients);
  };

  const handleOnCloseEditModal = () => {
    setSelectedIngredient(undefined);
  };

  const handleOnSaveIngredient = (ingredientDetails: Ingredient) => {
    let storedIngredients: Ingredient[] =
      localStorageService.getItem(ingredients);
    const selectedIndex = storedIngredients.findIndex(
      (ingredient) => ingredient.name === ingredientDetails.name
    );
    if (selectedIndex > -1) {
      storedIngredients[selectedIndex] = ingredientDetails;
    } else {
      storedIngredients = [ingredientDetails, ...storedIngredients];
    }
    setMyIngredients(storedIngredients);
    localStorageService.setItem(ingredients, storedIngredients);
    //clear selected ingredient and to auto close edit modal
    setSelectedIngredient(undefined);
    setShowAddModal(false);
  };

  const handleAddNewIngredient = () => {
    setShowAddModal(true);
  };

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
        onEditIngredient={handleOnEditIngredeint}
        onDeleteIngredient={handleOnDeleteIngredeint}
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
