import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import BranchBox from "./BranchBox/BranchBox";
import { ENVConfig } from "@/utils/Config";
import axios from "axios";

const GetData = async () => {
  try {
    const res = await axios.get(`${ENVConfig.baseURL}/api/portfolio/experience`);

    return res?.data;
  } catch (err: any) {
    console.log("err in review", err.message);
    return {data:null}
  }
};
async function ExperienceBox() {
  const { data } = await GetData();
  return data ? (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.heading}>Experience</div>
        <BranchBox expData={data} />
      </div>
    </div>
  ) : (
    <div>NO Data Avaible</div>
  );
}

export default ExperienceBox;
