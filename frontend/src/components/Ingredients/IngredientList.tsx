import React from "react";
import { Table } from "react-bootstrap";
import { Ingredient } from "../../types/types";
import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { isExpired } from "../../utils/functions";
interface Props {
  data: Ingredient[];
  onEditIngredient: (ingredient: Ingredient) => void;
  onDeleteIngredient: (ingredient: Ingredient) => void;
}

const IngredientList = ({
  data,
  onEditIngredient,
  onDeleteIngredient,
}: Props) => {
  /**
   * Method to pass selected edit ingredient
   * @param ingredient
   */
  const handleEdit = (ingredient: Ingredient) => {
    onEditIngredient(ingredient);
  };

  /**
   * Method to pass selected delete ingredient
   * @param ingredient
   */
  const handleDelete = (ingredient: Ingredient) => {
    onDeleteIngredient(ingredient);
  };
  /**
   * Method to highlight expired ingredient
   * @param expiryDt Date
   * @returns JSX
   */
  const populateExpiryDate = (expiryDt: string) => {
    if (isExpired(expiryDt)) {
      return <span className="highlight">{expiryDt}</span>;
    } else {
      return <span>{expiryDt}</span>;
    }
  };

  return (
    <div className="ingredient-list">
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Is Alcoholic</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((ingredient: Ingredient, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.alcoholic ? "Yes" : "No"}</td>
                  <td>
                    {ingredient.expiryDate
                      ? populateExpiryDate(ingredient.expiryDate)
                      : ""}
                  </td>
                  <td className="actions">
                    <span title="Edit">
                      <GrEdit onClick={() => handleEdit(ingredient)} />
                    </span>
                    <span title="Delete">
                      <AiFillDelete onClick={() => handleDelete(ingredient)} />
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default IngredientList;
