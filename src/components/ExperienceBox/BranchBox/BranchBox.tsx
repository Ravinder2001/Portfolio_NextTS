import React from "react";
import styles from "./style.module.scss";
import SVGIcons from "@/icons/SVGIcons";
import Image from "next/image";
import Images from "@/icons/Images";
type props = {
  expData: { cmp: string; id: string; about: string; role: string; duration: string }[];
};
function BranchBox(props: props) {
  return (
    <div className={styles.container}>
      <div className={styles.container1} id="projects">
        <div className={styles.timeline}>
          <ul>
            {props.expData.map((exp, index) => (
              <li key={exp.id}>
                <div className={`${index % 2 === 0 ? styles.timeline_content : styles.timeline_content_rev}`}>
                  <div className={styles.left_box} style={{ marginLeft: index % 2 != 0 ? "10px" : "0px" }}>
                    <div className={styles.company_name}>{exp.cmp}</div>
                    <div className={styles.role}>{exp.role}</div>
                    <div className={styles.duration}>{exp.duration}</div>
                    <div className={styles.about}>{exp.about}</div>
                  </div>

                  <Image src={Images("Logo")} alt="" className={styles.img} />
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
