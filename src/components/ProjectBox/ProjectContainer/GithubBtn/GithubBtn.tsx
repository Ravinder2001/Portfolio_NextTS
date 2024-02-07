"use client";
import React from "react";

import LucideIcons from "@/icons/LucideIcons";

import styles from "./style.module.scss";

type props = {
  url: string;
};

function GithubBtn(props: props) {

  const handleClick = () => {
    window.open(props.url, "_blank");
  };
  
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.text}> See Code!</div>
      <div className={styles.icon}>
        <LucideIcons name="github" size={18} />
      </div>
    </div>
  );
}

export default GithubBtn;
