"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./style.module.scss";
import InputBox from "../InputBox/InputBox";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import ImageBox from "../ImageBox/ImageBox";
import { convertToBase64 } from "@/utils/Function";
import ProfileImageBox from "../ProfileImageBox/ProfileImageBox";

type valuesType = {
  title: string;
  role: string;
  des: string;
  location: string;
  image: string;
  id?: string;
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
function EditHeroBox(props: props) {
  const { data: session } = useSession();
  const [values, setValues] = useState<valuesType>({
    title: "",
    role: "",
    des: "",
    image: "",
    location: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

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
  const handleRemoveImage = async () => {
    setValues((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async () => {
    let body = { ...values, relation_id: session?.user.name };
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post("/api/hero", body);

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
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const FetchHeroDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/hero");
      if (res?.data?.data) {
        setValues(res.data.data);
      }
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
    FetchHeroDetails();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>{props.data?.name}</div>
        <div>
          <DefaultToogle value={props.data?.active ?? true} handleChange={(e) => props.handleToogle(e, props.data?._id ?? "")} name="" />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.main_container}>
          <div className={styles.Imgbox}>
            <div className={styles.label}>Profile Picture</div>
            <ProfileImageBox id="" image={values.image} handleImage={handleImage} handleRemove={handleRemoveImage} />
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
            <div className={styles.label}>Location</div>
            <InputBox
              name="location"
              value={values.location}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="text"
              placeholder="Location"
            />
          </div>

          <div className={styles.btn} onClick={handleSubmit}>
            Submit
          </div>
        </div>
      )}
    </div>
  );
}

export default EditHeroBox;
