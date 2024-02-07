import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toogleIsSelected } from "../../../../lib/slices/SectionListSlice";
import { RootState } from "../../../../lib/store";

import styles from "./style.module.scss";

type props = {
  title: string;
  id: number;
};
function SectionListBox(props: props) {
  const disptach = useDispatch();
  const selected = useSelector((state: RootState) => state.SectionListReducer.selected);

  const handleClick = () => {
    disptach(toogleIsSelected(props.id));
  };

  return (
    <div className={props.id==selected?styles.sec_container:styles.container} onClick={handleClick}>
      <div className={styles.title}>{props.title}</div>
    </div>
  );
}

export default SectionListBox;
