import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TextField } from "@material-ui/core";

const styleSearch = makeStyles(theme => ({
  search: {
    margin: 0
  }
}));

export const Search = props => {
  const style = styleSearch();
  return (
    <TextField
      fullWidth
      multiline
      margin="dense"
      rowsMax="3"
      variant="outlined"
      label="Search"
      className={style.search}
      onChange={e => {
        if (props.onChange)
          props.onChange([
            {
              key: "name",
              value: e.target.value.trim().toLowerCase()
            }
          ]);
      }}
    />
  );
};
