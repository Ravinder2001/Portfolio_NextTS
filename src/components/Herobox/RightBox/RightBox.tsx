import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
function RightBox({ image }: { image: string }) {
  return (
    <div className={styles.container} data-aos="zoom-in" data-aos-duration="500">
      {/* <div className={styles.box}></div> */}
      <Image src={image} alt="" className={styles.img} width={500} height={500} />
    </div>
  );
}

export default RightBox;
