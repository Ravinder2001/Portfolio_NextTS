import React from "react";

import BranchBox from "./BranchBox/BranchBox";
import { ENVConfig } from "@/utils/Config";

import styles from "./style.module.scss";

const GetData = async () => {
  const res = await fetch(`${ENVConfig.baseURL}/api/getPortfolioData/experience`);
  if (!res.ok) {
    return { data: null };
  }
  return await res.json();
};

async function ExperienceBox() {
  const { data } = await GetData();
  return data ? (
    <div className={styles.container} id="Experience">
      <div className={styles.box}>
        <div className={styles.heading}>Experience</div>
        <BranchBox expData={data} />
      </div>
    </div>
  ) : (
    <div>No Data Available</div>
  );
}

export default ExperienceBox;
