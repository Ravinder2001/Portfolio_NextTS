import React from "react";
import Image from "next/image";

import { ENVConfig } from "@/utils/Config";

import styles from "./style.module.scss";

type DataType = {
  data: {
    _id: string;
    name: string;
    image: string;
  }[];
};

const GetData = async () => {
  const res = await fetch(`${ENVConfig.baseURL}/api/getPortfolioData/skill`);
  if (!res.ok) {
    return { data: null };
  }
  return await res.json();
};

async function SkillsBox() {
  const { data }: DataType = await GetData();
  return (
    <div className={styles.container} id="Skills">
      <div className={styles.heading}>Skills</div>
      {data ? (
        <div className={styles.skillBox}>
          {data.map((skill, index) => (
            <div key={index} className={styles.box} data-aos="flip-up">
              <Image className={styles.img} src={skill.image} alt="" width={800} height={800} />
              <div className={styles.name}>{skill.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Data Avaiblw</div>
      )}
    </div>
  );
}

export default SkillsBox;
