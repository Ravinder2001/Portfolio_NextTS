import React, { useEffect } from "react";
import Image from "next/image";

import VisitBtn from "./VisitBtn/VisitBtn";
import GithubBtn from "./GithubBtn/GithubBtn";

import styles from "./style.module.scss";

type props = {
  projectData: {
    id: string;
    name: string;
    type: string;
    des: string;
    image: string;
    url: string;
    github: string;
    isUrlVisible: boolean;
    isGithubVisible: boolean;
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
        <div className={styles.btn_group}>
          {props.projectData.isUrlVisible ? <VisitBtn url={props.projectData.url} /> : null}
          {props.projectData.isGithubVisible ? <GithubBtn url={props.projectData.github} /> : null}
        </div>
      </div>
    </div>
  );
}

export default ProjectContainer;
