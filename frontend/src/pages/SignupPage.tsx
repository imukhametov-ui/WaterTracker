import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";
import css from "./SignupPage.module.css";

export default function SignupPage() {
  return (
    <main className={css.page}>
      <div className={css.form}>
        <h1 className={css.title}>Sign Up</h1>

        <AuthForm mode="signup" classes={css} />

        <Link to="/signin" className={css.signinLink}>
          Sign in
        </Link>
      </div>
    </main>
  );
}
