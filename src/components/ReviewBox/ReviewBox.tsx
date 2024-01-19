import React from "react";
import styles from "./style.module.scss";
import Marquee from "react-fast-marquee";
import ReviewComponent from "./ReviewComponent/ReviewComponent";
import { ENVConfig } from "@/utils/Config";
import axios from "axios";
type dataType = {
  _id: string;
  name: string;
  star: number;
  des: string;
};

const GetData = async () => {
  const res = await axios.get(`${ENVConfig.baseURL}/api/portfolio/review`);
  if (res?.data?.data) {
    return res?.data?.data;
  } else {
    throw new Error("Something went wrong");
  }
};
async function ReviewBox() {
  const data: dataType[] = await GetData();
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Reviews</div>

      <Marquee direction="left" style={{ marginTop: "50px" }}>
        {data.map((review) => (
          <ReviewComponent data={review} key={review._id} />
        ))}
      </Marquee>
      {/* <Marquee direction="right" style={{ marginTop: "20px" }}>
        <ReviewComponent />
        <ReviewComponent />
        <ReviewComponent />
        <ReviewComponent />
      </Marquee> */}
    </div>
  );
}

export default ReviewBox;
