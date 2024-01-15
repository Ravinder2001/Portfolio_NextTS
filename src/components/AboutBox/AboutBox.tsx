import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
function AboutBox() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.left}>
            <Image src={Images("Profile")} alt="" className={styles.img}/>
        </div>
        <div className={styles.right}>
          <div className={styles.main}>Hello! My name is Ravinder Singh Negi, I am from Nainital, Uttarakhand.</div>
          <div className={styles.sub}>
            Dedicated and Ingenious full-stack web developer. Passionate about developing user-friendly websites. Possessing excellent problem-solving
            and multitasking skills as well as a good team player. Looking forward to being an integral part of a company and developing various
            products as a software engineer and developing my skills as a coder.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutBox;
