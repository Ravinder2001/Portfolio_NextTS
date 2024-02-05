import React from "react";
import styles from "./style.module.scss";
type props = {
  data: {
    title: string;
    role: string;
    des: string;
    location: string;
  };
};
function LeftBox(props: props) {
  const { data } = props;
  return (
    <div className={styles.container} data-aos="zoom-in" data-aos-duration="1000">
      <div className={styles.name}>
        <div className={styles.first}>Ravinder</div>
        <div className={styles.last}>Singh Negi</div>
      </div>
      <div className={styles.role}>{data.role}</div>
      <div className={styles.des}>{data.des}</div>
      <div className={styles.location}>{data.location}</div>
    </div>
  );
}

export default LeftBox;
