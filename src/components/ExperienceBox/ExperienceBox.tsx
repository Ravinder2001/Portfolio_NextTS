import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import BranchBox from "./BranchBox/BranchBox";
function ExperienceBox() {
  let expData = [
    {
      id: "1",
      cmp: "Indus Net Technologies",
      role: "Software Engineer",
      duration: "March 22 - Till Date",
      about: "About my experience in Indus net Technologies. This is my first company",
    },
    {
      id: "2",
      cmp: "Indus Net Technologies",
      role: "Software Engineer",
      duration: "March 22 - Till Date",
      about: "About my experience in Indus net Technologies. This is my first company",
    },
    {
      id: "3",
      cmp: "Indus Net Technologies",
      role: "Software Engineer",
      duration: "March 22 - Till Date",
      about: "About my experience in Indus net Technologies. This is my first company",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.heading}>Experience</div>
        <BranchBox expData={expData} />
      </div>
    </div>
  );
}

export default ExperienceBox;
