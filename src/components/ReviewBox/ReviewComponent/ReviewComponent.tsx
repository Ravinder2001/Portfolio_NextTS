import React from "react";
import styles from "./style.module.scss";
function ReviewComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.name}>Richards</div>
      <div className={styles.star}>⭐⭐⭐⭐</div>
      <div className={styles.des}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate eligendi, quidem cumque tempore voluptatem adipisci odio aspernatur
        tempora sit eveniet.
      </div>
    </div>
  );
}

export default ReviewComponent;
