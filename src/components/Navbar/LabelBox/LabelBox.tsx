// "use client"
import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
import { Link } from "react-scroll";
type props = {
  label: string;
  icon: string;
};
function LabelBox(props: props) {
  return (
    <div className={styles.container}>
      <Link activeClass="active" to={props.label}  spy={true} smooth={true} offset={-100} duration={500}>
        <div className={styles.label}>{props.label}</div>
      </Link>
      {/* <Image src={Images(props.icon)} alt="" className={styles.img} /> */}
    </div>
  );
}

export default LabelBox;
