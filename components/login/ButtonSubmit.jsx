"use client";

import { useFormStatus } from "react-dom";
import classes from "./ButtonSubmit.module.css";
import { motion } from "framer-motion";

export default function SubmitButton({ mode }) {
  const status = useFormStatus();

  if (status.pending) {
    return <p style={{ textAlign: "center" }}>Authenticating...</p>;
  }
  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className={classes.button}
        type="submit"
      >
        {mode === "login" ? (
          <motion.p
            animate={{ x: ["-50%", "50%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            Login
          </motion.p>
        ) : (
          <motion.p
            animate={{ x: ["-41%", "41%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            Create account
          </motion.p>
        )}
      </motion.button>
    </>
  );
}
