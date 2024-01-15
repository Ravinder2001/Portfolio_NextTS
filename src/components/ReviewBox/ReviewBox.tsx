import React from "react";
import styles from "./style.module.scss";
import Marquee from "react-fast-marquee";
import ReviewComponent from "./ReviewComponent/ReviewComponent";
function ReviewBox() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Reviews</div>

      <Marquee direction="left" style={{marginTop:"50px"}}>
        <ReviewComponent />
        <ReviewComponent />
        <ReviewComponent />
        <ReviewComponent />
      </Marquee>
      <Marquee direction="right" style={{marginTop:"20px"}}>
        <ReviewComponent />
        <ReviewComponent />
        <ReviewComponent />
        <ReviewComponent />
      </Marquee>
    </div>
  );
}

export default ReviewBox;
