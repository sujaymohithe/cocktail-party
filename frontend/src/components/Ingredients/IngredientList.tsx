import React from "react";
import { Table } from "react-bootstrap";
import { Ingredient } from "../../types/types";

interface Props {
  data: Ingredient[];
}

const IngredientList = ({ data }: Props) => {
  debugger;
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Is Alcoholic</th>
            <th>Expiry Date</th>
            <th>Edit</th>
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
                  <td>{ingredient.expiryDate?? ""}</td>
                  <td><input type="button" value="Edit"></input></td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default IngredientList;
