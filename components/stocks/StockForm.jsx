"use client";

import { createStock } from "@/actions/stocks";
import FormSubmit from "./FormSubmit";
import { useActionState } from "react";

export default function StockForm() {
  const [state, formAction] = useActionState(createStock, {});

  return (
    <>
      <form
        action={formAction}
        id="user-input"
        key={JSON.stringify(state.values)}
      >
        <div className="input-group">
          <label>Stock's Name</label>
          <input
            type="text"
            name="stockName"
            defaultValue={state.values?.stockName ?? ""}
          />
        </div>
        <div className="input-group">
          <label>Stock's Current Value</label>
          <input
            type="number"
            name="stockCurValue"
            defaultValue={state.values?.currValue ?? ""}
          />
        </div>
        <div className="input-group">
          <label>Stock's Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            defaultValue={state.values?.quantity ?? ""}
          />
        </div>
        <div className="input-group">
          <label>Stock's Bought Value</label>
          <input
            type="number"
            name="stockBoughtValue"
            defaultValue={state.values?.boughtValue ?? ""}
          />
        </div>
        <FormSubmit />
        {state.errors && (
          <ul>
            {state.errors.map((error) => (
              <li key={error}>{String(error)}</li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
}
