import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

import LucideIcons from "@/icons/LucideIcons";
import Loader from "../../Loader/Loader";

import styles from "./style.module.scss";
import Image from "next/image";

type existingDataType = {
  existingData: {
    name: string;
    des: string;
    image: string;
    star: number;
    _id: string;
    active: boolean;
  }[];
  handleEditClick: (e: { name: string; des: string; image: string; star: number; _id: string; active: boolean }) => void;
  loading: boolean;
  FetchExistingReviews: () => void;
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
            props.FetchExistingReviews();
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
      <div className={styles.heading}>Existing Reviews</div>
      {props.loading ? (
        <Loader />
      ) : (
        <div>
          {props.existingData.map((item) => (
            <div className={styles.box} key={item._id}>
              <div className={styles.right}>
                <div  className={styles.imgBox}>
                  <Image src={item.image} alt="" className={styles.img} width={20} height={20} />
                  <div className={styles.details}>
                    <div className={styles.title}>{item.name}</div>
                    <div className={styles.role}>{item.star}</div>
                  </div>
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
      )}
    </div>
  );
}

export default RightBox;
