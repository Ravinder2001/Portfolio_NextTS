import React, { Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
import LucideIcons from "@/icons/LucideIcons";

type existingDataType = {
  existingData: {
    _id: string;
    company: string;
    des: string;
    duration: string;
    image: string;
    role: string;
    active: boolean;
  }[];
  handleEditClick: (e: { company: string; role: string; des: string; duration: string; image: string; _id?: string; active: boolean }) => void;
};
function RightBox(props: existingDataType) {
  console.log("props",props)
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Existing Companines</div>
      <div>
        {props.existingData.map((item) => (
          <div className={styles.box} key={item._id}>
            <Image src={item.image} alt="" width={100} height={100} className={styles.img} />

            <div className={styles.right}>
              <div>
                <div className={styles.title}>{item.company}</div>
                <div className={styles.role}>{item.role}</div>
              </div>
              <div className={styles.footer}>
                <div className={styles.icon} onClick={() => props.handleEditClick(item)}>
                  <LucideIcons name="edit" color="green" size={20} />
                </div>
                <div className={styles.icon}>
                  <LucideIcons name="delete" color="red" size={20} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RightBox;
