import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import BranchBox from "./BranchBox/BranchBox";
import { ENVConfig } from "@/utils/Config";
import axios from "axios";

const GetData = async () => {
  const res = await fetch(`${ENVConfig.baseURL}/api/getPortfolioData/experience`, { cache: "no-store" });
  if (!res.ok) {
    return { data: null };
  }
  return await res.json();
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
