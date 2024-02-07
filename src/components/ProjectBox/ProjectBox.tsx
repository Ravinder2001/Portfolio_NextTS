import React from "react";
import styles from "./style.module.scss";
import ProjectContainer from "./ProjectContainer/ProjectContainer";
import axios from "axios";
import { ENVConfig } from "@/utils/Config";

type DataType = {
  data: {
    id: string;
    name: string;
    type: string;
    des: string;
    image: string;
    url: string;
    github: string;
    tech: { tech_name: string; _id: string; image: string }[];
  }[];
};
const GetData = async () => {
  const res = await fetch(`${ENVConfig.baseURL}/api/getPortfolioData/project`, { cache: "no-store" });
  if (!res.ok) {
    return { data: null };
  }
  return await res.json();
};
async function ProjectBox() {
  const { data }: DataType = await GetData();

  return data ? (
    <div className={styles.container} id="Projects">
      <div className={styles.heading}>My Amazing Works</div>
      {data.map((project, index) => (
        <ProjectContainer projectData={project} key={project.id} index={index} />
      ))}
    </div>
  ) : (
    <div>No data Avaivle</div>
  );
}

export default ProjectBox;
