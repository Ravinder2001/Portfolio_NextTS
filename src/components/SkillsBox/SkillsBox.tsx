import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
import { getImageName } from "@/utils/Function";
function SkillsBox() {
  let skills = ["React", "TypeScript", "JavaScript", "NodeJS", "Postgres", "MongoDB", "AWS", "Socket.io", "SASS"];
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Skills</div>
      <div className={styles.skillBox}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.box}>
            <Image className={styles.img} src={Images(getImageName(skill))} alt="" />
            <div className={styles.name}>{skill}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsBox;
