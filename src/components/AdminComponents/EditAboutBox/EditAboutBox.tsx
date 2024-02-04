"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./style.module.scss";
import InputBox from "../InputBox/InputBox";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import StackTable from "../StackTable/StackTable";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import ImageBox from "../ImageBox/ImageBox";
import { convertToBase64 } from "@/utils/Function";
import Loader from "../Loader/Loader";
import ProfileImageBox from "../ProfileImageBox/ProfileImageBox";

type valuesType = {
  title: string;
  des: string;
  image: string;
  _id?: string;
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
function EditAboutBox(props: props) {
  const { data: session } = useSession();
  const [values, setValues] = useState<valuesType>({
    title: "",
    des: "",
    image: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [isImageChange, setIsImageChange] = useState<boolean>(false);

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
      setIsImageChange(true);
    }
  };
  const handleRemove = () => {
    setValues((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async () => {
    if (submitLoading) {
      return;
    }
    let body = {
      ...values,
      relation_id: session?.user.name,
      isImageChange,
    };
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
          const res = await axios.post("/api/about", body);

          if (res?.status == 200) {
            setIsImageChange(false);
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

  const FetchExistingAboutDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/about");
      if (res?.data?.data) {
        setValues(res?.data?.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    FetchExistingAboutDetails();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>About</div>
        <div>
          <DefaultToogle value={props.data?.active ?? true} handleChange={(e) => props.handleToogle(e, props.data?._id ?? "")} name="" />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div>
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
            <ProfileImageBox id="" image={values.image} handleImage={handleImage} handleRemove={handleRemove} />
          </div>

          <div className={styles.btn} onClick={handleSubmit}>
            {submitLoading ? "loading..." : "Submit"}
          </div>
        </div>
      )}
    </div>
  );
}

export default EditAboutBox;
