import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import lightGreen from "@material-ui/core/colors/lightGreen";

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  ButtonBase,
  Badge
} from "@material-ui/core";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";

import { MomentUtil } from "@front/util";

const styleMealCard = makeStyles(theme => ({
  gridList: {
    flexWrap: "nowrap"
  },
  buttonBase: {
    display: "flex",
    width: "100%"
  },
  badge: {
    width: "100%",
    color: lightGreen.A700,
    "& .MuiBadge-badge": {
      transform: "translate(-2px, 5px);"
    },
    borderRadius: 8,
    boxSizing: "border-box",
    border: props =>
      `${props.meal_info.selected ? lightGreen.A700 : "transparent"} 3px solid`
  },
  card: {
    display: "flex",
    width: "100%"
  },
  image: {
    width: 100,
    "-webkit-mask-image":
      "-webkit-linear-gradient(left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 90%)"
  },
  name: {
    fontSize: 14,
    fontWeight: 900
  },
  content: {
    flex: "1 0 auto",
    color: "#616161"
  },
  time: {
    fontSize: 12
  }
}));

export const MealCard = props => {
  var { meal_info: meal, onClick } = props;
  const style = styleMealCard(props);

  const [selected, setSelected] = useState(meal.selected || false);

  return (
    <ButtonBase
      className={style.buttonBase}
      onClick={() => {
        onClick();
        setSelected(!selected);
        console.log(selected);
      }}
    >
      <Badge
        className={style.badge}
        invisible={!selected}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        badgeContent={<CheckCircleTwoToneIcon />}
      >
        <Card className={style.card}>
          <CardMedia
            className={style.image}
            image={meal.image}
            title={meal.name}
          />
          <CardContent className={style.content}>
            <Typography className={style.name}>{meal.name}</Typography>
            <Typography className={style.time}>
              {MomentUtil.hmsFormat(meal.time)}
            </Typography>
          </CardContent>
        </Card>
      </Badge>
    </ButtonBase>
  );
};
