import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Images from "@/icons/Images";
import LucideIcons from "@/icons/LucideIcons";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../Loader/Loader";
import DefaultToogle from "../../ToogleBtn/ToogleBtn";

type existingDataType = {
  existingProjects: {
    _id: string;
    name: string;
    type: string;
    des: string;
    image: string;
    active: boolean;
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
    active: boolean;
    tech: {
      tech_name: string;
      image: string;
      _id: string;
    }[];
  }) => void;
  loading: boolean;
  handleToogle: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
};
function RightBox(props: existingDataType) {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this Project?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.patch("/api/project", { id });

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
      <div className={styles.heading}>Existing Projects</div>
      {props.loading ? (
        <Loader />
      ) : (
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
                  <DefaultToogle name="" value={item.active} handleChange={(e) => props.handleToogle(e, item._id)} />
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
