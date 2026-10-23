import { Link } from "react-router-dom";
import calendarIcon from "../assets/calendar.svg";
import statisticsIcon from "../assets/statistics.svg";
import settingsIcon from "../assets/settings.svg";
import css from "./WelcomePage.module.css";

const benefits = [
  { icon: calendarIcon, text: "Habit drive" },
  { icon: statisticsIcon, text: "View statistics" },
  { icon: settingsIcon, text: "Personal rate setting" },
];

const waterReasons = [
  "Supply of nutrients to all organs",
  "Providing oxygen to the lungs",
  "Maintaining the work of the heart",
  "Release of processed substances",
  "Ensuring the stability of the internal environment",
  "Maintaining within the normal temperature",
  "Maintaining an immune system capable of resisting disease",
];

export default function WelcomePage() {
  return (
    <main className={css.page}>
      <div className={css.content}>
        <section className={css.intro}>
          <div className={css.heading}>
            <h1>Water consumption tracker</h1>
            <p>Record daily water intake and track</p>
          </div>

          <div className={css.benefits}>
            <h2>Tracker Benefits</h2>

            <ul className={css.benefitsList}>
              {benefits.map((benefit) => (
                <li key={benefit.text} className={css.benefit}>
                  <img src={benefit.icon} alt="" />
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/signup" className={css.button}>
            Try tracker
          </Link>
        </section>

        <section className={css.waterCard}>
          <h2>Why drink water</h2>

          <ul className={css.waterList}>
            {waterReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
