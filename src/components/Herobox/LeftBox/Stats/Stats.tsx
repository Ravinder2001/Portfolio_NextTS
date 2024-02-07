"use client";
import React from "react";
import styles from "./style.module.scss";
import CountUp from "react-countup";
type props = {
  count: number;
  label: string;
  isPlus: boolean;
};
function Stats(props: props) {
  return (
    <div className={styles.box}>
      <span className={styles.number}>
        <span>
          <CountUp end={props.count} duration={3} />
        </span>
        {props.isPlus ? "+" : null}
      </span>
      <span className={styles.label}>{props.label}</span>
    </div>
  );
}

export default Stats;
