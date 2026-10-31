import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";
import styles from "./SigninPage.module.css";

export default function SigninPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign In</h1>

        <AuthForm mode="signin" classes={styles} />

        <Link to="/signup" className={styles.signupLink}>
          Sign up
        </Link>
      </div>
    </main>
  );
}