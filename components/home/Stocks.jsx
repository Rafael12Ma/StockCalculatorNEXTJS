import classes from "./Stocks.module.css";

export default function Stocks({ stocks, onDelete }) {
  return (
    <section className={classes.stockList}>
      <h2>Your Stocks</h2>
      {stocks.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <ul>
          {stocks.map((stock) => (
            <li key={stock.id}>
              <strong>{stock.name}</strong> — ${stock.price.toFixed(2)}
              <button onClick={() => onDelete(stock.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
