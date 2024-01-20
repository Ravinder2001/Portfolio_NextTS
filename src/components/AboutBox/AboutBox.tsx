import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
import { ENVConfig } from "@/utils/Config";
import axios from "axios";
type dataType = {
  _id: string;
  title: string;
  des: string;
  image: string;
};

const GetData = async () => {
  const res = await axios.get(`${ENVConfig.baseURL}/api/portfolio/about`);
  return res?.data?.data;
};
async function AboutBox() {
  const data: dataType = await GetData();
  return data? <div className={styles.container}>
  <div className={styles.box} data-aos="zoom-in">
    <div className={styles.left}>
      <Image src={data.image} width={100} height={100} alt="" className={styles.img} />
    </div>
    <div className={styles.right}>
      <div className={styles.main}>{data.title}</div>
      <div className={styles.sub}>{data.des}</div>
    </div>
  </div>
</div>:<div>No Data Avaible!</div>
}

export default AboutBox;
