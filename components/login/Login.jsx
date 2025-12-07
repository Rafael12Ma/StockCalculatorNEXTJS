"use client";

import { useActionState } from "react";
import {
  hasMinLength,
  isEmail,
  isEqualToOtherValue,
  isNotEmpty,
} from "./validation.js";
import { stockForm } from "@/lib/actions.jsx";
// import LoadingQuery from "../components/LoadingQuery.jsx";
// import { useStocksQuery } from "../hooks/useStockQuery.js";

function loginAction(prevFormState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPass = formData.get("confirm-password");
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const role = formData.get("role");
  const terms = formData.get("terms");
  const acquisitionChannel = formData.getAll("acquisition");

  let errors = [];

  if (!isEmail(email)) {
    errors.push("Invalid email address.");
  }

  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push("You must provide a password with at least six characters.");
  }

  if (isEqualToOtherValue(password, confirmPass)) {
    errors.push("Passwords do not match.");
  }

  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    errors.push("Please provide both your first and last name.");
  }

  if (!isNotEmpty(role)) {
    errors.push("Please select a role.");
  }

  if (!terms) {
    errors.push("You must agree to the terms and conditions.");
  }

  if (acquisitionChannel.length === 0) {
    errors.push("Please select at least one acquisition chanel.");
  }

  if (errors.length > 0) {
    return {
      errors,
      enteredValues: {
        email,
        password,
        confirmPass,
        firstName,
        lastName,
        role,
        terms,
        acquisitionChannel,
      },
    };
  }
  return { errors: null };
}

export default function Login() {
  let content;
  //   const { data, isPending, isError, error } = useStocksQuery();

  //   //   if (isPending) {
  //   //     content = <LoadingQuery text="Fetching Stocks..." />;
  //   //   }

  //   if (isError) {
  //     content = (
  //       <p style={{ textAlign: "center" }}>
  //         Error loading data : {error.message}
  //       </p>
  //     );
  //   }

  //   // tanstackQuery
  //   const [formState, formAction] = useActionState(loginAction, { errors: null });

  return (
    <>
      <p>SIgnUp</p>
      {/* {content}{" "}
      {data && (
        <form action={stockForm}>
          <h2>Welcome on board!</h2>
          <p>
            We just need a little bist of data from you to get you started 🚀
          </p>

          <div className="control">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              defaultValue={formState.enteredValues?.email}
            />
          </div>

          <div className="control-row">
            <div className="control">
              <label htmlFor="password">Password</label>
              <input
                defaultValue={formState.enteredValues?.password}
                id="password"
                type="password"
                name="password"
              />
            </div>

            <div className="control">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                defaultValue={formState.enteredValues?.confirmPass}
                id="confirm-password"
                type="password"
                name="confirm-password"
              />
            </div>
          </div>

          <hr />

          <div className="control-row">
            <div className="control">
              <label htmlFor="first-name">First Name</label>
              <input
                defaultValue={formState.enteredValues?.firstName}
                type="text"
                id="first-name"
                name="first-name"
              />
            </div>

            <div className="control">
              <label htmlFor="last-name">Last Name</label>
              <input
                defaultValue={formState.enteredValues?.lastName}
                type="text"
                id="last-name"
                name="last-name"
              />
            </div>
          </div>

          <div className="control">
            <label htmlFor="phone">What best describes your role?</label>
            <select
              defaultValue={formState.enteredValues?.role}
              id="role"
              name="role"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="employee">Employee</option>
              <option value="founder">Founder</option>
              <option value="other">Other</option>
            </select>
          </div>

          <fieldset>
            <legend>How did you find us?</legend>
            <div className="control">
              <input
                defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
                  "google"
                )}
                type="checkbox"
                id="google"
                name="acquisition"
                value="google"
              />
              <label htmlFor="google">Google</label>
            </div>

            <div className="control">
              <input
                defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
                  "friend"
                )}
                type="checkbox"
                id="friend"
                name="acquisition"
                value="friend"
              />
              <label htmlFor="friend">Referred by friend</label>
            </div>

            <div className="control">
              <input
                type="checkbox"
                id="other"
                name="acquisition"
                value="other"
                defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
                  "other"
                )}
              />
              <label htmlFor="other">Other</label>
            </div>
          </fieldset>

          <div className="control">
            <label htmlFor="terms-and-conditions">
              <input
                defaultChecked={formState.enteredValues?.terms}
                type="checkbox"
                id="terms-and-conditions"
                name="terms"
              />
              agree to the terms and conditions
            </label>
          </div>
          {formState.errors && (
            <ul className="error">
              {formState.errors.map((error) => {
                return <li key={error}>{error}</li>;
              })}
            </ul>
          )}
          <p className="form-actions">
            <button type="reset" className="button button-flat">
              Reset
            </button>
            <button className="button">Sign up</button>
          </p>
        </form>
      )} */}
    </>
  );
}
