"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./style.module.scss";
import InputBox from "../InputBox/InputBox";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import StackTable from "../StackTable/StackTable";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";

type valuesType = {
  name: string;
  des: string;
  star: number;
};
function EditReviewsBox() {
  const { data: session } = useSession();
  const [values, setValues] = useState<valuesType>({
    name: "",
    star: 0,
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
      };
      const res = await axios.post("/api/review", body);

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
  const handleAddSkill = async () => {
    try {
      let body = {
        ...values,
      };
      const res = await axios.put(`/api/review/${session?.user.id}`, body);

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

  const FetchExistingReviews = async () => {
    try {
      const res=await axios.get("/api/review")
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(()=>{
    FetchExistingReviews()
  },[])
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>Reviews</div>
        <div>
          <DefaultToogle value={isVisible} handleChange={ToogleVisible} name="" />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.box}>
            <div className={styles.label}>User Name</div>
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
            <div className={styles.label}>Star</div>
            <select name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
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

          <div className={styles.btn} onClick={handleSubmit}>
            Submit
          </div>
        </div>
        <div className={styles.right}>Left</div>
      </div>
    </div>
  );
}

export default EditReviewsBox;
