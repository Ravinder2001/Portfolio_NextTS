import React from "react";
import { useDispatch } from "react-redux";

import { toogleIsSelected } from "../../../../lib/slices/SectionListSlice";

import styles from "./style.module.scss";

type props = {
  title: string;
  id: number;
};
function SectionListBox(props: props) {
  const disptach = useDispatch();
  const handleClick = () => {
    disptach(toogleIsSelected(props.id));
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.title}>{props.title}</div>
    </div>
  );
}

export default SectionListBox;
