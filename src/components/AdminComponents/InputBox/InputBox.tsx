"use client";
import React, { ChangeEvent } from "react";

import styles from "./style.module.scss";

type props = {
  value: string | number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTextAreaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  type: string;
  placeholder?: string;
  name: string;
  row?: number;
};

function InputBox(props: props) {
  return props.type == "text"|| props.type=="number" ? (
    <input
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      className={styles.input}
    />
  ) : (
    <textarea
      name={props.name}
      value={props.value}
      onChange={props.handleTextAreaChange}
      placeholder={props.placeholder}
      className={styles.textarea}
      rows={props.row}
      // cols={50}
    />
  );
}

export default InputBox;
