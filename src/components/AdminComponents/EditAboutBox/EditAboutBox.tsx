"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./style.module.scss";
import InputBox from "../InputBox/InputBox";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import StackTable from "../StackTable/StackTable";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

type valuesType = {
  title: string;
  des: string;
};
function EditAboutBox() {
  const { data: session } = useSession();
  const [values, setValues] = useState<valuesType>({
    title: "",
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
        image: "aa",
      };
      const res = await axios.post("/api/about", body);

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

  const FetchExistingAboutDetails = async () => {
    try {
      const res = await axios.get("/api/about");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    FetchExistingAboutDetails();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>About</div>
        <div>
          <DefaultToogle value={isVisible} handleChange={ToogleVisible} name="" />
        </div>
      </div>

      <div className={styles.box}>
        <div className={styles.label}>Title</div>
        <InputBox
          name="title"
          value={values.title}
          handleTextAreaChange={handleTextAreaChange}
          handleChange={handleChange}
          type="text"
          placeholder="Title"
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
        <div className={styles.label}>Image</div>
        <input type="file" className={styles.upload} />
      </div>

      <div className={styles.btn} onClick={handleSubmit}>
        Submit
      </div>
    </div>
  );
}

export default EditAboutBox;
