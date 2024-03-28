import React from "react";

import styles from "./style.module.scss";
import Image from "next/image";

type Props = {
  data: {
    _id: string;
    name: string;
    star: number;
    des: string;
    image: string;
  };
};

function ReviewComponent(props: Props) {
  const { data } = props;
  console.log("🚀  data:", data)

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < data.star; i++) {
      stars.push("⭐");
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <div>{data.image ? <Image src={data.image} alt="" width={50} height={50} className={styles.img} /> : <div className={styles.avatarName}>{data.name[0]}</div>}</div>
      <div className={styles.left}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.star}>{renderStars()}</div>
        <div className={styles.des}>{data.des}</div>
      </div>
    </div>
  );
}

export default ReviewComponent;
