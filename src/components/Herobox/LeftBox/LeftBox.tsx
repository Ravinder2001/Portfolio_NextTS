import React from "react";

import ResumeBtn from "./ResumeBtn/ResumeBtn";
import Stats from "./Stats/Stats";

import styles from "./style.module.scss";
import AnimatedText from "./AnimationText/AnimatedText";

type props = {
  data: {
    title: string;
    role: string;
    des: string;
    location: string;
    name: string;
    years: string;
    projects: string;
    skills: string;
    resume: string;
  };
};

function LeftBox(props: props) {
  const { data } = props;
  return (
    <div className={styles.container} data-aos="zoom-in" data-aos-duration="1000">
      {/* <div className={styles.name}>{data.title}</div> */}
      <AnimatedText/>
      <div className={styles.role}>{data.role}</div>
      <div className={styles.des}>{data.des}</div>
      <div className={styles.location}>{data.location}</div>
      <ResumeBtn  url={data.resume} />
      <div className={styles.bottom_container}>
        <Stats count={Number(data.years)} isPlus={true} label="Years Experience" />
        <Stats count={Number(data.projects)} isPlus={false} label="Projects Completed" />
        <Stats count={Number(data.skills)} isPlus={false} label="Skills" />
      </div>
    </div>
  );
}

export default LeftBox;
