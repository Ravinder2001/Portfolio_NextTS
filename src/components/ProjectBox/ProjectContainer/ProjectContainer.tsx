import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
import { getImageName } from "@/utils/Function";
type props = {
  projectData: {
    id: string;
    name: string;
    type: string;
    about: string;
    tech: string[];
  };
  index: number;
};
function ProjectContainer(props: props) {
  

  return (
    <div className={props.index % 2 == 0 ? styles.container : styles.container_rev}>
      <div className={styles.leftBox}>
        <Image src={Images("Water")} alt="" className={styles.img} />
      </div>
      <div className={styles.rightBox}>
        <div className={styles.name}>{props.projectData.name}</div>
        <div className={styles.type}>{props.projectData.type}</div>
        <div className={styles.about}>{props.projectData.about}</div>
        <div className={styles.stackbox}>
          {props.projectData.tech.map((tech, index) => (
            <div className={styles.stack} key={index}>
              <Image src={Images(getImageName(tech))} alt="" className={styles.icon} />
              <div className={styles.stackName}>{tech}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectContainer;
