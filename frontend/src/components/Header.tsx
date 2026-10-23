import { Link } from "react-router-dom";
import styles from "./Header.module.css";

import logo from "../assets/logo.svg";
import userIcon from "../assets/outline.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/welcome" className={styles.logo}>
        <img
          src={logo}
          alt="WaterTracker logo"
          className={styles.logoIcon}
        />
        <span className={styles.logoText}>
          Tracker
          <span>of water</span>
        </span>
      </Link>

      <Link to="/signin" className={styles.signin}>
        <span>Sign in</span>
        <img
          src={userIcon}
          alt=""
          className={styles.userIcon}
        />
      </Link>
    </header>
  );
}

