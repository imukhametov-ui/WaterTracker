import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import styles from "./SigninPage.module.css";

import eyeSlash from "../assets/eyeslash.svg";

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign In</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Enter your email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              autoComplete="email"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Enter your password
            </label>

            <div className={styles.passwordWrapper}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                className={styles.passwordInput}
                required
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                aria-pressed={showPassword}
              >
                <img src={eyeSlash} alt="" />
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
        </form>

        <Link to="/signup" className={styles.signupLink}>
          Sign up
        </Link>
      </div>
    </main>
  );
}
