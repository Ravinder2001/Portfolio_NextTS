"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./style.module.scss";
import InputBox from "../InputBox/InputBox";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import StackTable from "../StackTable/StackTable";
import axios from "axios";

import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

type valuesType = {
  name: string;
  type: string;
  des: string;
};
function EditProjectsBox() {
  const { data: session } = useSession();
  const [values, setValues] = useState<valuesType>({
    name: "",
    type: "",
    des: "",
  });
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const ToogleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      let body = {
        ...values,
        user_id: session?.user.id,
        image: "asd",
        tech: [
          {
            tech_name: "s",
            image: "s",
          },
        ],
      };
      const res = await axios.post("/api/project", body);

      if (res?.status == 200) {
        Swal.fire({
          icon: "success",
          title: res?.data?.message,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const handleAddProject = async () => {
    try {
      let body = {
        ...values,
        image: "asd",
        tech: [
          {
            tech_name: "s",
            image: "s",
          },
        ],
      };
      const res = await axios.put(`/api/project/${session?.user.id}`, body);

      if (res?.status == 200) {
        Swal.fire({
          icon: "success",
          title: res?.data?.message,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const FetchProductList = async () => {
    try {
      const res = await axios.get("/api/project");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    FetchProductList();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>Projects</div>
        <div>
          <DefaultToogle value={isVisible} handleChange={ToogleVisible} name="" />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.box}>
            <div className={styles.label}>Project Name</div>
            <InputBox
              name="name"
              value={values.name}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="text"
              placeholder="Project Name"
            />
          </div>
          <div className={styles.box}>
            <div className={styles.label}>Type</div>
            <InputBox
              name="type"
              value={values.type}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="text"
              placeholder="Type"
            />
          </div>

          <div className={styles.box}>
            <div className={styles.label}>Description</div>
            <InputBox
              name="des"
              value={values.des}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="textarea"
              placeholder="Description"
              row={3}
            />
          </div>
          <div className={styles.box}>
            <div className={styles.label}>Tech Stacks</div>
            <StackTable />
          </div>
          <div className={styles.btn} onClick={handleSubmit}>
            Submit
          </div>
        </div>
        <div className={styles.right}>Left</div>
      </div>
    </div>
  );
}

export default EditProjectsBox;
