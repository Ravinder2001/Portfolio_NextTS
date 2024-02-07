import React from "react";

import styles from "./style.module.scss";

type props = {
  data: {
    _id: string;
    name: string;
    star: number;
    des: string;
  };
};

function ReviewComponent(props: props) {
  const { data } = props;
  return (
    <div className={styles.container}>
      <div className={styles.name}>{data.name}</div>
      <div className={styles.star}>⭐⭐⭐⭐</div>
      <div className={styles.des}>{data.des}</div>
    </div>
  );
}

export default ReviewComponent;
