"use client";

import { useFormStatus } from "react-dom";
import classes from "./ButtonSubmit.module.css";

export default function SubmitButton({ mode }) {
  const status = useFormStatus();

  if (status.pending) {
    return <p style={{ textAlign: "center" }}>Creating user...</p>;
  }
  return (
    <>
      <button className={classes.button} type="submit">
        {mode === "login" ? <p>Login</p> : <p>Create account</p>}
      </button>
    </>
  );
}
