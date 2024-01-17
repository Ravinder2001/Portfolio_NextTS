"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./style.module.scss";
import InputBox from "../InputBox/InputBox";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import RightBox from "./RightBox/RightBox";
import Image from "next/image";
import ImageBox from "../ImageBox/ImageBox";
import { convertToBase64 } from "@/utils/Function";

type valuesType = {
  company: string;
  role: string;
  des: string;
  duration: string;
  image: string;
  _id?: string;
  active: boolean;
};
type existingDataType = {
  _id: string;
  company: string;
  des: string;
  duration: string;
  image: string;
  role: string;
  active: boolean;
};
function EditExperienceBox() {
  const { data: session } = useSession();
  const [values, setValues] = useState<valuesType>({
    company: "",
    role: "",
    des: "",
    duration: "",
    image: "",
    active: true,
  });

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [existingData, setExistingData] = useState<existingDataType[]>([]);
  const [isEdit, setIsEdit] = useState<string>("");

  const ToogleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const res = await convertToBase64(e.target.files[0]);
      setValues((prev) => ({ ...prev, image: res }));
    }
  };
  const handleEditClick = (e: valuesType) => {
    if (e?._id) {
      setValues(e);
      setIsEdit(e._id);
    }
  };

  const handleSubmit = async () => {
    try {
      let body = { ...values, relation_id: session?.user.name };
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

  const FetchExistingExpDetails = async () => {
    try {
      const res = await axios.get(`/api/experience`);
      setExistingData(res?.data?.data);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  useEffect(() => {
    FetchExistingExpDetails();
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
            <ImageBox handleImage={handleImage} image={values.image} handleRemove={() => {}} id="" />
          </div>
          <div className={styles.btn} onClick={handleSubmit}>
            Submit
          </div>
        </div>
        <div className={styles.right}>
          <RightBox existingData={existingData} handleEditClick={handleEditClick} />
        </div>
      </div>
    </div>
  );
}

export default EditExperienceBox;
