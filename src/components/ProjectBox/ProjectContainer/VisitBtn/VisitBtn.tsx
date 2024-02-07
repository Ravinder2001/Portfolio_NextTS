"use client";
import React from "react";
import styles from "./style.module.scss";
import LucideIcons from "@/icons/LucideIcons";
type props = {
  url: string;
};
function VisitBtn(props: props) {
  const handleClick = () => {
    window.open(props.url, "_blank");
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.text}>Visit Now!</div>
      <div className={styles.icon}>
        <LucideIcons name="visit" size={18} />
      </div>
    </div>
  );
}

export default VisitBtn;
