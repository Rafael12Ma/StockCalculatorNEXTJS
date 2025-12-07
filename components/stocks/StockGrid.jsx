import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

export default function StocksGrid({ stocks }) {
  return (
    <>
      <ul className={classes.stocks}>
        {stocks.map((stock) => (
          <li key={stock.id}>
            <MealItem {...stock} />
          </li>
        ))}
      </ul>
    </>
  );
}
