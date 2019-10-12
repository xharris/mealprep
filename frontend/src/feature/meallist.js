import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Paper,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  ButtonGroup,
  Tooltip
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import grey from "@material-ui/core/colors/grey";

import { MealCard } from "@feature/mealcard";
import { Search } from "@feature/search";

const styleMealList = makeStyles(theme => ({
  paper: {
    height: 400,
    width: 262,
    display: "flex",
    flexFlow: "column"
  },
  search: {
    flex: "0 1 auto"
  },
  boxList: {
    flex: "1 1 auto",
    height: "70%",
    overflow: "auto",
    borderTop: `1px solid ${grey[300]}`,
    borderBottom: `1px solid ${grey[300]}`
  },
  boxFooter: {
    flex: "0 1 40px",
    padding: "0px 5px"
  }
}));

export const MealList = props => {
  const style = styleMealList();

  const [searchTerms, setSearchTerms] = useState([]);
  const [selectedOnly, setSelectedOnly] = useState(false);

  return (
    <Paper className={style.paper}>
      <Search
        className={style.search}
        onChange={terms => {
          setSearchTerms(terms);
        }}
      />
      <Box className={style.boxList}>
        {props.meals
          .filter(
            meal =>
              (selectedOnly === false || meal.selected) &&
              meal.filterTags(searchTerms)
          )
          .map(meal => (
            <MealCard
              key={meal.id}
              meal_info={meal}
              selected={meal.selected}
              onClick={() => {
                meal.selected = !meal.selected;
              }}
            />
          ))}
      </Box>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={style.boxFooter}
      >
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOnly}
                onChange={e => {
                  setSelectedOnly(e.target.checked);
                }}
                color="secondary"
                value="selectedOnly"
              />
            }
            label="selected"
          />
        </FormGroup>
        <ButtonGroup variant="text">
          <Tooltip title="Import recipe from a website">
            <Button color="secondary" size="small" onClick={e => {}}>
              <CloudDownloadIcon />
            </Button>
          </Tooltip>

          <Tooltip title="Create new recipe">
            <Button color="secondary" size="small" onClick={e => {}}>
              <AddIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Grid>
    </Paper>
  );
};
