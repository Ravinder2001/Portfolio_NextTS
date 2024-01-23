import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
import { getImageName } from "@/utils/Function";
import { ENVConfig } from "@/utils/Config";
import axios from "axios";

type DataType = {
  data: {
    _id: string;
    name: string;
    image: string;
  }[];
};

const GetData = async () => {
  try {
    const res = await axios.get(`${ENVConfig.baseURL}/api/portfolio/skill`);

    return res?.data;
  } catch (err: any) {
    console.log("err in review", err.message);
    return {data:null}
  }
};
async function SkillsBox() {
  const { data }: DataType = await GetData();
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Skills</div>
      {data ? (
        <div className={styles.skillBox}>
          {data.map((skill, index) => (
            <div key={index} className={styles.box} data-aos="flip-up">
              <Image className={styles.img} src={skill.image} alt="" width={100} height={100} />
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
