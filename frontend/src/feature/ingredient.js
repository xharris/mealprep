import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class IngredientCard extends Component {
  render() {
    return (
      <Button variant="contained" color="primary">
        Add ingredient
      </Button>
    );
  }
}

export default IngredientCard;
