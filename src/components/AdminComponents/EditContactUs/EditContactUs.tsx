import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
function EditContactUs() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const ToogleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async () => {
    try {
      let body = {
        user_id: session?.user.id,
        name: "Linkedin",
        link: "asd",
        active: true,
      };
      const res = await axios.post(`/api/contact`, body);

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

  const FetchExistingContactList = async () => {
    try {
      const res = await axios.get("/api/contact");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    FetchExistingContactList();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>Contact Us</div>
        <div>
          <DefaultToogle value={isVisible} handleChange={ToogleVisible} name="" />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>Github</div>
        <div className={styles.sub}>
          <input type="text" className={styles.input} />
          <DefaultToogle value={isVisible} handleChange={ToogleVisible} name="" />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>Linkedin</div>
        <div className={styles.sub}>
          <input type="text" className={styles.input} />
          <DefaultToogle value={isVisible} handleChange={ToogleVisible} name="" />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>WhatsApp</div>
        <div className={styles.sub}>
          <input type="text" className={styles.input} />
          <DefaultToogle value={isVisible} handleChange={ToogleVisible} name="" />
        </div>
      </div>
      <div className={styles.btn} onClick={handleSubmit}>
        Submoit
      </div>
    </div>
  );
}

export default EditContactUs;
