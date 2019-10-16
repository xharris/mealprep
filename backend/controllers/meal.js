import { TBL } from "../names";

export const getAllMeals = (_req, res, db) => {
  db.select("*")
    .from(TBL.ingredients)
    .then(items => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};
