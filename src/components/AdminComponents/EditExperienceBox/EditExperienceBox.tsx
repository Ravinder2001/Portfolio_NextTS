"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";

import InputBox from "../InputBox/InputBox";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import RightBox from "./RightBox/RightBox";
import ImageBox from "../ImageBox/ImageBox";
import { convertToBase64 } from "@/utils/Function";

import styles from "./style.module.scss";

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

type props = {
  data:
    | {
        _id?: string;
        name: string;
        active: boolean;
      }
    | undefined;
  handleToogle: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
};

function EditExperienceBox(props: props) {
  const { data: session } = useSession();

  const [values, setValues] = useState<valuesType>({
    company: "",
    role: "",
    des: "",
    duration: "",
    image: "",
    active: true,
  });
  const [existingData, setExistingData] = useState<existingDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isImageChange, setImageChange] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

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
      setImageChange(true);
    }
  };
  const handleEditClick = (e: valuesType) => {
    if (e?._id) {
      setValues(e);
    }
  };
  const handleToogle = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.patch(`/api/experience/${id}`, {
            active: !e.target.checked,
          });

          if (res?.status == 200) {
            setExistingData((prev) => {
              return prev.map((item) => {
                if (item._id == id) {
                  return { ...item, active: !e.target.checked };
                } else {
                  return item;
                }
              });
            });
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
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleSubmit = async () => {
    if (submitLoading) {
      return;
    }
    let body = { ...values, relation_id: session?.user.name, isImageChange };
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          setSubmitLoading(true);
          const res = await axios.post("/api/experience", body);

          if (res?.status == 200) {
            FetchExistingExpDetails();
            setImageChange(false);
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
        } finally {
          setSubmitLoading(false);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const FetchExistingExpDetails = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    FetchExistingExpDetails();
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>Experience</div>
        <div>
          <DefaultToogle value={props.data?.active ?? true} handleChange={(e) => props.handleToogle(e, props.data?._id ?? "")} name="" />
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
            {submitLoading?"loading...":"Submit"}
          </div>
        </div>
        <div className={styles.right}>
          <RightBox
            existingData={existingData}
            handleEditClick={handleEditClick}
            loading={loading}
            handleToogle={handleToogle}
            FetchExistingExpDetails={FetchExistingExpDetails}
          />
        </div>
      </div>
    </div>
  );
}

export default EditExperienceBox;
