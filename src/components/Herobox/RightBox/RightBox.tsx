import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
function RightBox() {
  return (
    <div className={styles.container}>
      <div className={styles.box}></div>
      <Image src={Images("Profile")} alt="" className={styles.img} />
    </div>
  );
}

export default RightBox;
