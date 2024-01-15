import LucideIcons from "@/icons/LucideIcons";
import React, { ChangeEvent } from "react";
import styles from "./style.module.scss";

type props = {
  value?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
};
function StackTable(props: props) {
  return (
    <div className={styles.container}>
      <input type="text" value={props.value} name={props.name} onChange={props.handleChange} className={styles.name} placeholder="Technology" />

      <input type="file" className={styles.input} />

      <div className={styles.icon}>
        <LucideIcons name="delete" color="red" size={15} />
      </div>
    </div>
  );
}

export default StackTable;
