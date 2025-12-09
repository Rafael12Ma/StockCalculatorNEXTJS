"use client";

import classes from "../login/Login.module.css";
import { auth } from "@/actions/auth-actions";
import Link from "next/link";
import ButtonSubmit from "./ButtonSubmit";
import { useActionState } from "react";
import { motion } from "framer-motion";

export default function Login({ mode }) {
  const [state, formAction] = useActionState(auth.bind(null, mode), {});

  return (
    <>
      <div className={classes.pageWrapper}>
        <form action={formAction} className={classes.SignUpForm}>
          <h2>Authentication</h2>

          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" />
          </div>

          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" />
          </div>

          <div className={classes.formActions}>
            <ButtonSubmit mode={mode} />
            {state.errors && (
              <ul className={classes.formErrors}>
                {Object.keys(state.errors).map((error) => (
                  <li key={error}>{state.errors[error]}</li>
                ))}{" "}
              </ul>
            )}
            <motion.p
              whileHover={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
            >
              {mode === "login" && (
                <Link href="/?mode=signup" className={classes.mode}>
                  Create an account
                </Link>
              )}
              {mode === "signup" && (
                <Link href="/?mode=login" className={classes.mode}>
                  Login with existing account
                </Link>
              )}{" "}
            </motion.p>
          </div>
        </form>
      </div>
    </>
  );
}
