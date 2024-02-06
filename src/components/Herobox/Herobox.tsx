import React from "react";
import styles from "./style.module.scss";
import LeftBox from "./LeftBox/LeftBox";
import RightBox from "./RightBox/RightBox";
import axios from "axios";
import { ENVConfig } from "@/utils/Config";

const GetData = async () => {
  const res = await fetch(`${ENVConfig.baseURL}/api/getPortfolioData/hero`, { cache: "no-store", next: { revalidate: 5 } });
  if (!res.ok) {
    return { data: null };
  }
  return await res.json();
};
async function Herobox() {
  const { data } = await GetData();

  return data ? (
    <div className={styles.container} id="Hero">
      <div className={styles.main_container}>
        <LeftBox data={data} />
        <RightBox image={data.image} />
      </div>
    </div>
  ) : (
    <div>No Data Avaiable!</div>
  );
}

export default Herobox;
