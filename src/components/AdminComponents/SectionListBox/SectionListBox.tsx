import LucideIcons from "@/icons/LucideIcons";
import React from "react";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { toogleIsSelected } from "../../../../lib/slices/SectionListSlice";
import { signOut } from "next-auth/react";
type props = {
  title: string;
  id: number;
  isSelected: boolean;
};
function SectionListBox(props: props) {
  const disptach = useDispatch();
  const handleClick = () => {
    disptach(toogleIsSelected(props.id));
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.icon}>
        <LucideIcons name={props.isSelected ? "arrow-right" : "arrow-down"} />
      </div>
    </div>
  );
}

export default SectionListBox;
