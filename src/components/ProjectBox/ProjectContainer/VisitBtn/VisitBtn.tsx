"use client";
import React from "react";
import styles from "./style.module.scss";
import LucideIcons from "@/icons/LucideIcons";
function VisitBtn() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>Visit Now!</div>
      <div className={styles.icon}>
        <LucideIcons name="visit" size={18} />
      </div>
    </div>
  );
}

export default VisitBtn;
