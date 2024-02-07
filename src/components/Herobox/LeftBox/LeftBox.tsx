import React from "react";
import styles from "./style.module.scss";
import ResumeBtn from "./ResumeBtn/ResumeBtn";

import Stats from "./Stats/Stats";
type props = {
  data: {
    title: string;
    role: string;
    des: string;
    location: string;
  };
};
function LeftBox(props: props) {
  const { data } = props;
  return (
    <div className={styles.container} data-aos="zoom-in" data-aos-duration="1000">
      <div className={styles.name}>{data.title}</div>
      <div className={styles.role}>{data.role}</div>
      <div className={styles.des}>{data.des}</div>
      <div className={styles.location}>{data.location}</div>
      <ResumeBtn />
      <div className={styles.bottom_container}>
        <Stats count={2} isPlus={true} label="Years Experience" />
        <Stats count={10} isPlus={false} label="Projects Completed" />
        <Stats count={10} isPlus={false} label="Skills" />
      </div>
    </div>
  );
}

export default LeftBox;
