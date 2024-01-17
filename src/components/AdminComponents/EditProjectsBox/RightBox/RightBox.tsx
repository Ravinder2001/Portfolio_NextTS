import React, { Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
import LucideIcons from "@/icons/LucideIcons";

type existingDataType = {
  existingProjects: {
    _id: string;
    name: string;
    type: string;
    des: string;
    image: string;
    active:boolean;
    tech: {
      tech_name: string;
      image: string;
      _id: string;
    }[];
  }[];
  
  handleEditClick: (e: {
    _id: string;
    name: string;
    type: string;
    des: string;
    image: string;
    active:boolean;
    tech: {
      tech_name: string;
      image: string;
      _id: string;
    }[];
  }) => void;
};
function RightBox(props: existingDataType) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Existing Companines</div>
      <div>
        {props.existingProjects.map((item) => (
          <div className={styles.box} key={item._id}>
            <Image src={item.image} alt="" width={100} height={100} className={styles.img} />

            <div className={styles.right}>
              <div>
                <div className={styles.title}>{item.name}</div>
                <div className={styles.role}>{item.type}</div>
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
