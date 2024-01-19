import LucideIcons from "@/icons/LucideIcons";
import React from "react";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import { toogleIsSelected } from "../../../../lib/slices/SectionListSlice";
type props = {
  title: string;
  id: number;
};
function SectionListBox(props: props) {
  console.log("🚀  props:", props)
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
