import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import localStorageService from "../../services/localStorageService";
import { Cocktail, Ingredient } from "../../types/types";
import { isExpired } from "../../utils/functions";
import "./Cocktail.scss";

interface Props {
  data: Cocktail[];
}

const CocktialList = ({ data }: Props) => {
  const ingredients: Ingredient[] = localStorageService.getItem("ingredients");

  const checkCocktailPreparingStatus = (requiredIngredients: string[]) => {
    const missingIngredients = requiredIngredients.filter(
      (ri) =>
        !ingredients.some(
          (i) =>
            i.name.toLowerCase() === ri.toLowerCase() &&
            !isExpired(i.expiryDate)
        )
    );

    return missingIngredients;
  };

  return (
    <div>
      <Row>
        {data &&
          data.map((cocktail: Cocktail, index: number) => {
            const missingIngredients = checkCocktailPreparingStatus(
              cocktail.ingredients
            );
            return (
              <Col sm={12} md={6} lg={6} className="col-grid" key={index}>
                <div className="cocktail-container">
                  <div>
                    <h4>{cocktail.name}</h4>
                  </div>
                  <div>
                    <b>STATUS: </b>
                    {missingIngredients.length > 0 ? (
                      <Badge bg="danger">Cannot be prepared</Badge>
                    ) : (
                      <Badge bg="success">Can be prepared</Badge>
                    )}
                  </div>
                  <hr />
                  <div className="ingredients-info">
                    <span>Required Ingredients: </span>
                    <span title={cocktail.ingredients.join(", ")}>
                      {cocktail.ingredients.join(", ")}
                    </span>
                  </div>
                  <div className="ingredients-info warn">
                    <span>Missing Ingredients: </span>
                    <span>{missingIngredients.join(", ")}</span>
                  </div>
                </div>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default CocktialList;
