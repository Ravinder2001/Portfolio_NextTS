import React from "react";
import styles from "./style.module.scss";
function LeftBox() {
  return (
    <div className={styles.container}>
      <div className={styles.name}>Hello, I am Ravinder</div>
      <div className={styles.flip}>
        <div>
          <div>Backend Developer</div>
        </div>
        <div>
          <div>Frontend Developer</div>
        </div>
        <div>
          <div>Full Stack Web Developer</div>
        </div>
      </div>
      <div className={styles.des}>
        I’m a Software Engineer with a passion for building great software. In my free time, you’ll find me riding mountain. Currently working in
        Indus Net Technologies as Asscoiate Software Engineer.
      </div>
      <div className={styles.location}>Kolkata, West Bengal</div>
    </div>
  );
}

export default LeftBox;
