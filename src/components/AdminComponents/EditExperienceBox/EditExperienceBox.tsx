"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./style.module.scss";
import InputBox from "../InputBox/InputBox";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";

type valuesType = {
  company: string;
  role: string;
  des: string;
  duration: string;
};
function EditExperienceBox() {
  const { data: session } = useSession();
  const [values, setValues] = useState<valuesType>({
    company: "",
    role: "",
    des: "",
    duration: "",
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
      let body = { ...values, logo: "asd", user_id: session?.user.id };
      const res = await axios.post("/api/experience", body);

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
  const handleAddCompany = async () => {
    try {
      let body = { ...values, logo: "asd" };
      const res = await axios.put(`/api/experience/${session?.user.id}`, body);

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

  const FetchExpDetails = async () => {
    try {
      const res = await axios.get(`/api/experience`);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    FetchExpDetails();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>Experience</div>
        <div>
          <DefaultToogle value={isVisible} handleChange={ToogleVisible} name="" />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.box}>
            <div className={styles.label}>Company Name</div>
            <InputBox
              name="company"
              value={values.company}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="text"
              placeholder="Company Name"
            />
          </div>
          <div className={styles.box}>
            <div className={styles.label}>Role</div>
            <InputBox
              name="role"
              value={values.role}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="text"
              placeholder="Role"
            />
          </div>
          <div className={styles.box}>
            <div className={styles.label}>Duration</div>
            <InputBox
              name="duration"
              value={values.duration}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="text"
              placeholder="Duration"
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
            <div className={styles.label}>Company Logo</div>
            <input type="file" className={styles.upload} />
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

export default EditExperienceBox;
