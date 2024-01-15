import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import StackTable from "../StackTable/StackTable";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

function EditSkillsBox() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const ToogleVisible = () => {
    setIsVisible(!isVisible);
  };
  const handleSubmit = async () => {
    try {
      let body = {
        user_id: session?.user.id,
        name: "React",
        image: "asda",
      };
      const res = await axios.post("/api/skill", body);

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
      let body = [
        {
          name: "Next js",
          image: "asda",
        },
      ];

      const res = await axios.put(`/api/skill/${session?.user.id}`, body);

      if (res?.status == 200) {
        Swal.fire({
          icon: "success",
          title: res?.data?.message,
        });
      }
    } catch (error: any) {
      console.log("🚀  error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const FetchExistingSkills = async () => {
    try {
      const res=await axios.get("/api/skill")
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(()=>{
    FetchExistingSkills()
  },[])
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>Skills</div>
        <div>
          <DefaultToogle value={isVisible} handleChange={ToogleVisible} name="" />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.left}>
          <StackTable />
          <div className={styles.btn} onClick={handleSubmit}>
            Submit
          </div>
        </div>
        <div className={styles.right}>RIght</div>
      </div>
    </div>
  );
}

export default EditSkillsBox;
