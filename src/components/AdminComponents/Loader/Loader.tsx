import React from "react";

import styles from "./style.module.scss"

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
    </div>
  );
}

export default Loader;
