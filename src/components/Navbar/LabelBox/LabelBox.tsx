import React from "react";
import { Link } from "react-scroll";

import styles from "./style.module.scss";

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
    </div>
  );
}

export default LabelBox;
