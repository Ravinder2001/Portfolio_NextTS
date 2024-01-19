import React from "react";
import styles from "./style.module.scss";
import LeftBox from "./LeftBox/LeftBox";
import RightBox from "./RightBox/RightBox";
import axios from "axios";
import { ENVConfig } from "@/utils/Config";

const GetData = async () => {
  const res = await axios.get(`${ENVConfig.baseURL}/api/portfolio/hero`);
  if (res?.data?.data) {
    return res?.data?.data;
  } else {
    throw new Error("Something went wrong");
  }
};
async function Herobox() {
  const data = await GetData();
  return (
    <div className={styles.container}>
      <LeftBox data={data} />
      <RightBox image={data.image} />
    </div>
  );
}

export default Herobox;
