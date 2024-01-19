import React, { Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
import LucideIcons from "@/icons/LucideIcons";
import Swal from "sweetalert2";
import axios from "axios";

type existingDataType = {
  existingData: {
    name: string;
    des: string;
    star: number;
    _id: string;
    active: boolean;
  }[];
  handleEditClick: (e: { name: string; des: string; star: number; _id: string; active: boolean }) => void;
};
function RightBox(props: existingDataType) {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this Company?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.patch("/api/review", { id });
          if (res?.status == 200) {
            Swal.fire({
              title: "Deleted!",
              text: res?.data.message,
              icon: "success",
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Existing Companines</div>
      <div>
        {props.existingData.map((item) => (
          <div className={styles.box} key={item._id}>
            <div className={styles.right}>
              <div>
                <div className={styles.title}>{item.name}</div>
                <div className={styles.role}>{item.star}</div>
              </div>
              <div className={styles.footer}>
                <div className={styles.icon} onClick={() => props.handleEditClick(item)}>
                  <LucideIcons name="edit" color="green" size={20} />
                </div>
                <div className={styles.icon} onClick={() => handleDelete(item._id)}>
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
