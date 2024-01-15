import React from "react";
import styles from "./style.module.scss";
import LeftBox from "./LeftBox/LeftBox";
import RightBox from "./RightBox/RightBox";
function Herobox() {
  return (
    <div className={styles.container}>
      <LeftBox />
      <RightBox />
    </div>
  );
}

export default Herobox;
