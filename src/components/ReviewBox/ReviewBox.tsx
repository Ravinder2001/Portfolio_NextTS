import React from "react";
import Marquee from "react-fast-marquee";

import ReviewComponent from "./ReviewComponent/ReviewComponent";
import { ENVConfig } from "@/utils/Config";

import styles from "./style.module.scss";

type dataType = {
  data: {
    _id: string;
    name: string;
    star: number;
    des: string;
    image: string;
  }[];
};

const GetData = async () => {
  const res = await fetch(`${ENVConfig.baseURL}/api/getPortfolioData/review`);
  if (!res.ok) {
    return { data: null };
  }
  return await res.json();
};

async function ReviewBox() {
  const { data }: dataType = await GetData();
  return (
    <div className={styles.container} id="Reviews">
      <div className={styles.heading}>Reviews</div>
      {data ? (
        <>
          <Marquee direction="left" style={{ marginTop: "50px" }}>
            {data.slice(0, Math.ceil(data.length / 2)).map((review) => (
              <ReviewComponent data={review} key={review._id} />
            ))}
          </Marquee>
          <Marquee direction="right" style={{ marginTop: "50px" }}>
            {data.slice(Math.floor(data.length / 2), data.length).map((review) => (
              <ReviewComponent data={review} key={review._id} />
            ))}
          </Marquee>
        </>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}

export default ReviewBox;
