import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
function RightBox({ image }: { image: string }) {
  return (
    <div className={styles.container} data-aos="zoom-in" data-aos-duration="500">
      <Image src={image} alt="" className={styles.img} width={1000} height={1000} />
    </div>
  );
}

export default RightBox;
