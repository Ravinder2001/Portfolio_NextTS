import React from "react";

import styles from "./style.module.scss";

type Props = {
  data: {
    _id: string;
    name: string;
    star: number;
    des: string;
  };
};

function ReviewComponent(props: Props) {
  const { data } = props;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < data.star; i++) {
      stars.push("⭐");
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <div className={styles.name}>{data.name}</div>
      <div className={styles.star}>{renderStars()}</div>
      <div className={styles.des}>{data.des}</div>
    </div>
  );
}

export default ReviewComponent;
