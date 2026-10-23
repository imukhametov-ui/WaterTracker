import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={css.container}>
      <div className={css.left}>
        <section className={css.norma}>
          <p>My daily norma</p>
          <h2>1.5 L</h2>
        </section>

        <section className={css.progress}>
          <h2>Today</h2>
        </section>
      </div>

      <section className={css.right}>
        <h2>Today</h2>
        <h2 className={css.month}>Month</h2>
      </section>
    </main>
  );
}