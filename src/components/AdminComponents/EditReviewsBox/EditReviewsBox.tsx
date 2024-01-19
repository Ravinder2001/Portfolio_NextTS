"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./style.module.scss";
import InputBox from "../InputBox/InputBox";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import StackTable from "../StackTable/StackTable";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import RightBox from "./RightBox/RightBox";

type valuesType = {
  name: string;
  des: string;
  star: number;
  _id?: string;
  active: boolean;
};
type existingReviews = {
  name: string;
  des: string;
  star: number;
  _id: string;
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
function EditReviewsBox(props:props) {
  const { data: session } = useSession();
  const [values, setValues] = useState<valuesType>({
    name: "",
    star: 0,
    des: "",
    active: true,
  });
  const [existingReviews, setExistingReviews] = useState<existingReviews[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleStarChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValues((prev: any) => ({ ...prev, star: e.target.value }));
  };

  const handleEditClick = (e: existingReviews) => {
    setValues(e);
  };

  const handleSubmit = async () => {
    let body = {
      ...values,
      relation_id: session?.user.name,
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
          const res = await axios.post("/api/review", body);

          if (res?.status == 200) {
            FetchExistingReviews()
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

  const FetchExistingReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/review");
      if (res?.data?.data) {
        setExistingReviews(res?.data?.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    FetchExistingReviews();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>Reviews</div>
        <div>
          <DefaultToogle value={props.data?.active ?? true} handleChange={(e) => props.handleToogle(e, props.data?._id ?? "")} name="" />
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
            <select name="" id="" value={values.star} onChange={handleStarChange}>
              <option value="0">Select Star</option>
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
        <div className={styles.right}>
          <RightBox FetchExistingReviews={FetchExistingReviews} existingData={existingReviews} handleEditClick={handleEditClick} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default EditReviewsBox;
