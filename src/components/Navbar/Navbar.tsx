import React from "react";
import LabelBox from "./LabelBox/LabelBox";
import styles from "./style.module.scss";
function Navbar() {
  
  return (
    <div className={styles.container}>
      <LabelBox label="Experience" icon="Experience" />
      <LabelBox label="Projects" icon="Project" />
      <LabelBox label="Skills" icon="Skills" />
      <LabelBox label="Reviews" icon="Reviews" />
      <LabelBox label="About" icon="About" />
      <LabelBox label="Contact" icon="Contact" />
    </div>
  );
}

export default Navbar;
