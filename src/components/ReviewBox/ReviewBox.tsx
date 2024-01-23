import React from "react";
import styles from "./style.module.scss";
import Marquee from "react-fast-marquee";
import ReviewComponent from "./ReviewComponent/ReviewComponent";
import { ENVConfig } from "@/utils/Config";
import axios from "axios";
type dataType = {
  data: {
    _id: string;
    name: string;
    star: number;
    des: string;
  }[];
};

const GetData = async () => {
  try {
    const res = await axios.get(`${ENVConfig.baseURL}/api/portfolio/review`);

    return res?.data;
  } catch (err: any) {
    console.log("err in review", err.message);
    return {data:null}
  }
};
async function ReviewBox() {
  const { data }: dataType = await GetData();
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Reviews</div>
      {data ? (
        <Marquee direction="left" style={{ marginTop: "50px" }}>
          {data.map((review) => (
            <ReviewComponent data={review} key={review._id} />
          ))}
        </Marquee>
      ) : (
        <div>No Data</div>
      )}

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
