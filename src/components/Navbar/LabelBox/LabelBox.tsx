import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
type props = {
  label: string;
  icon: string;
};
function LabelBox(props: props) {
  return (
    <div className={styles.container}>
      <Image src={Images(props.icon)} alt="" className={styles.img} />
      <div className={styles.label}>{props.label}</div>
    </div>
  );
}

export default LabelBox;
