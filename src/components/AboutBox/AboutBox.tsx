import React from "react";
import Image from "next/image";

import { ENVConfig } from "@/utils/Config";

import styles from "./style.module.scss";
import ContactBox from "./ContactBox/ContactBox";

type dataType = {
  data: { _id: string; title: string; des: string; image: string };
};

const GetData = async () => {
  const res = await fetch(`${ENVConfig.baseURL}/api/getPortfolioData/about`);
  if (!res.ok) {
    return { data: null };
  }
  return await res.json();
};
async function AboutBox() {
  const { data }: dataType = await GetData();
  return data ? (
    <div className={styles.container} id="About">
      <div className={styles.box} data-aos="zoom-in">
        <div className={styles.left}>
          <Image src={data.image} width={1000} height={1000} alt="" className={styles.img} />
        </div>
        <div className={styles.right}>
          <div className={styles.main}>{data.title}</div>
          <div className={styles.sub}>{data.des}</div>
          <ContactBox/>
        </div>
      </div>
    </div>
  ) : (
    <div>No Data Avaible!</div>
  );
}

export default AboutBox;
