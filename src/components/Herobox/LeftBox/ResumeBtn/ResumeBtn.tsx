"use client";
import React from "react";

import styles from "./style.module.scss";

type props = {
  url: string;
};
function ResumeBtn(props: props) {
  
  const viewPDF = () => {
    const pdfLink: string = props.url;
    window.open(pdfLink, "_blank");
  };

  return (
    <div className={styles.btn} onClick={viewPDF}>
      View Resume
    </div>
  );
}

export default ResumeBtn;
