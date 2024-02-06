"use client";
import React from "react";
import styles from "./style.module.scss";
function ResumeBtn() {
  function viewPDF() {
    // Replace 'your_pdf_link_here' with the actual link to your PDF file
    const pdfLink: string = "https://docs.google.com/document/d/1-z7VkgukW3rmsRcUuqNshfhq2jLGpnQvmelCKWXOVTM/edit?usp=sharing";

    window.open(pdfLink, "_blank");
  }
  return (
    <div className={styles.btn} onClick={viewPDF}>
      View Resume
    </div>
  );
}

export default ResumeBtn;
