import React from "react";
import styles from "./style.module.scss";
import ProjectContainer from "./ProjectContainer/ProjectContainer";
import axios from "axios";
import { ENVConfig } from "@/utils/Config";

type DataType = {
  id: string;
  name: string;
  type: string;
  des: string;
  image: string;
  tech: { tech_name: string; _id: string; image: string }[];
}[];
const GetData = async () => {
  const res = await axios.get(`${ENVConfig.baseURL}/api/portfolio/project`);
  if (res?.data?.data) {
    return res?.data?.data;
  } else {
    throw new Error("Something went wrong");
  }
};
async function ProjectBox() {
  const data: DataType = await GetData();

  return (
    <div className={styles.container}>
      <div className={styles.heading}>My Amazing Works</div>
      {data.map((project, index) => (
        <ProjectContainer projectData={project} key={project.id} index={index} />
      ))}
    </div>
  );
}

export default ProjectBox;
