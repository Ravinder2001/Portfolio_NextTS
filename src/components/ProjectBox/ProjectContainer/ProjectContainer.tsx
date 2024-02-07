import React, { useEffect } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import LucideIcons from "@/icons/LucideIcons";
import VisitBtn from "./VisitBtn/VisitBtn";

type props = {
  projectData: {
    id: string;
    name: string;
    type: string;
    des: string;
    image: string;
    tech: { tech_name: string; _id: string; image: string }[];
  };
  index: number;
};
function ProjectContainer(props: props) {
  return (
    <div className={props.index % 2 == 0 ? styles.container : styles.container_rev} data-aos={props.index % 2 == 0 ? "fade-right" : "fade-left"}>
      <div className={styles.leftBox}>
        <Image src={props.projectData.image} alt="" className={styles.img} width={1000} height={800} />
      </div>
      <div className={styles.rightBox}>
        <div className={styles.name}>{props.projectData.name}</div>
        <div className={styles.type}>{props.projectData.type}</div>
        <div className={styles.about}>{props.projectData.des}</div>
        <div className={styles.stackbox}>
          {props.projectData.tech.map((tech, index) => (
            <div className={styles.stack} key={index}>
              <Image src={tech.image} alt="" className={styles.icon} width={500} height={500} />
              <div className={styles.stackName}>{tech.tech_name}</div>
            </div>
          ))}
        </div>
        <VisitBtn />
      </div>
    </div>
  );
}

export default ProjectContainer;
