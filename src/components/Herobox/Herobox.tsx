import React from "react";
import styles from "./style.module.scss";
import LeftBox from "./LeftBox/LeftBox";
import RightBox from "./RightBox/RightBox";
import axios from "axios";
import { ENVConfig } from "@/utils/Config";

const GetData = async () => {
  try {
    const res = await axios.get(`${ENVConfig.baseURL}/api/portfolio/hero`);

    return res?.data;
  } catch (err: any) {
    console.log("err in review", err.message);
    return {data:null}
  }
};
async function Herobox() {
  const { data } = await GetData();
  return data ? (
    <div className={styles.container}>
      <LeftBox data={data} />
      <RightBox image={data.image} />
    </div>
  ) : (
    <div>No Data Avaiable!</div>
  );
}

export default Herobox;
