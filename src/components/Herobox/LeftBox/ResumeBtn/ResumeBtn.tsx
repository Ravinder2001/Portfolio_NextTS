"use client";
import React from "react";
import styles from "./style.module.scss";
type props={
  url:string
}
function ResumeBtn(props:props) {
  function viewPDF() {
    // Replace 'your_pdf_link_here' with the actual link to your PDF file
    const pdfLink: string = props.url;

    window.open(pdfLink, "_blank");
  }
  return (
    <div className={styles.btn} onClick={viewPDF}>
      View Resume
    </div>
  );
}

export default ResumeBtn;
