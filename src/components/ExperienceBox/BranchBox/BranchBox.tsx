import React from "react";
import Image from "next/image";

import styles from "./style.module.scss";

type props = {
  expData: { company: string; _id: string; des: string; role: string; duration: string; image: string }[];
};

function BranchBox(props: props) {
  return (
    <div className={styles.container}>
      <div className={styles.container1} id="projects">
        <div className={styles.timeline}>
          <ul>
            {props.expData.map((exp, index) => (
              <li key={exp._id}>
                <div
                  className={`${index % 2 === 0 ? styles.timeline_content : styles.timeline_content_rev}`}
                  data-aos="zoom-in"
                >
                  <div className={styles.left_box} style={{ marginLeft: index % 2 != 0 ? "10px" : "0px" }}>
                    <div className={styles.company_name}>{exp.company}</div>
                    <div className={styles.role}>{exp.role}</div>
                    <div className={styles.duration}>{exp.duration}</div>
                    <div className={styles.about}>{exp.des}</div>
                  </div>

                  <Image src={exp.image} alt="" className={styles.img} width={1000} height={1000} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BranchBox;
