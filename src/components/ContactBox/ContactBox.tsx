import SVGIcons from "@/icons/SVGIcons";
import React from "react";
import styles from "./style.module.scss";
function ContactBox() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <SVGIcons name="Linkedin" />
      </div>
      <div className={styles.box}>
        <SVGIcons name="Whatsapp" />
      </div>
      <div className={styles.box}>
        <SVGIcons name="Github" />
      </div>
    </div>
  );
}

export default ContactBox;
