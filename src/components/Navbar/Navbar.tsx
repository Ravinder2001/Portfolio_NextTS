"use client"
import React from "react";
import LabelBox from "./LabelBox/LabelBox";
import styles from "./style.module.scss";
import { Link } from "react-scroll";
function Navbar() {
  return (
    <div className={styles.container}>
      <Link activeClass="active" to="Hero" spy={true} smooth={true} offset={-100} duration={500}>
        <span className={styles.left}>Ravinder.<span className={styles.cast}>dev</span></span>
      </Link>

      <div className={styles.middle}>
        <LabelBox label="Experience" icon="Experience" />
        <LabelBox label="Projects" icon="Project" />
        <LabelBox label="Skills" icon="Skills" />
        <LabelBox label="Reviews" icon="Reviews" />
        <LabelBox label="About" icon="About" />
        <LabelBox label="Contact" icon="Contact" />
      </div>
    </div>
  );
}

export default Navbar;
