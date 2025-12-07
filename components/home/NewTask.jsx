import classes from "./NewTask.module.css";

export default function NewTask({ label, handleAdd, refStock, refPrice }) {
  return (
    <section className={classes.inputTasks}>
      <p>
        <label id="label">{label}</label>
      </p>
      <p>
        <input ref={refStock} type="text" placeholder="Enter stock name..." />
      </p>
      <p>
        <input
          ref={refPrice}
          type="number"
          placeholder="Enter stock current price..."
        />
      </p>
      <p>
        <button
          onClick={() =>
            handleAdd(refStock.current.value, refPrice.current.value)
          }
        >
          +
        </button>
      </p>
    </section>
  );
}
