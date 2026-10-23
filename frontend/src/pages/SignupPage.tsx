
import { useState } from "react";
import { Link } from "react-router-dom";
import eyeSlash from "../assets/eyeslash.svg";
import css from "./SignupPage.module.css";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <main className={css.page}>
      <form
        className={css.form}
        onSubmit={(event) => event.preventDefault()}
      >
        <h1 className={css.title}>Sign Up</h1>

        <label className={css.field}>
          <span>Enter your email</span>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            autoComplete="email"
            required
          />
        </label>

        <label className={css.field}>
          <span>Enter your password</span>

          <div className={css.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className={css.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              <img src={eyeSlash} alt="" />
            </button>
          </div>
        </label>

        <label className={css.field}>
          <span>Repeat password</span>

          <div className={css.passwordWrapper}>
            <input
              type={showRepeatPassword ? "text" : "password"}
              name="repeatPassword"
              placeholder="Repeat password"
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className={css.eyeButton}
              onClick={() =>
                setShowRepeatPassword(!showRepeatPassword)
              }
              aria-label={
                showRepeatPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              <img src={eyeSlash} alt="" />
            </button>
          </div>
        </label>

        <button type="submit" className={css.submitButton}>
          Sign Up
        </button>

        <Link to="/signin" className={css.signinLink}>
          Sign in
        </Link>
      </form>
    </main>
  );
}
