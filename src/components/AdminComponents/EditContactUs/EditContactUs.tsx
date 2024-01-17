import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./style.module.scss";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";

type contactType = {
  name: string;
  link: string;
  active: boolean;
  _id?: string;
};

let options = {
  github: "Github",
  linkedin: "Linkedin",
  whatsapp: "WhatsApp",
};
function EditContactUs() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [intialAPI, setInitialAPI] = useState<boolean>(false);
  const [github, setGithub] = useState<contactType>({
    name: "",
    link: "",
    active: false,
  });
  const [linkedin, setLinkedin] = useState<contactType>({
    name: "",
    link: "",
    active: false,
  });
  const [whatsapp, setWhatsapp] = useState<contactType>({
    name: "",
    link: "",
    active: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case options.github:
        return setGithub((prev) => ({ ...prev, link: e.target.value }));
      case options.linkedin:
        return setLinkedin((prev) => ({ ...prev, link: e.target.value }));
      case options.whatsapp:
        return setWhatsapp((prev) => ({ ...prev, link: e.target.value }));
      default:
        return e.target.value;
    }
  };
  const handleToogle = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case options.github:
        return setGithub((prev) => ({ ...prev, active: e.target.checked }));
      case options.linkedin:
        return setLinkedin((prev) => ({ ...prev, active: e.target.checked }));
      case options.whatsapp:
        return setWhatsapp((prev) => ({ ...prev, active: e.target.checked }));
      default:
        return e.target.value;
    }
  };

  const ToogleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleCreate = async () => {
    try {
      let body = [
        {
          name: options.linkedin,
          link: "https://www.linkedin.com/feed/",
          active: true,
          relation_id: "1",
        },
        {
          name: options.github,
          link: "https://github.com/",
          active: true,
          relation_id: "1",
        },
        {
          name: options.whatsapp,
          link: "https://web.whatsapp.com/",
          active: true,
          relation_id: "1",
        },
      ];
      await axios.post(`/api/contact`, body);
      setInitialAPI(true);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const handleUpdate = async () => {
    try {
      let body = [{ ...github }, { ...linkedin }, { ...whatsapp }];
      const res = await axios.put(`/api/contact`, body);
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
      if (res?.data?.data.length == 0) {
        if (!intialAPI) handleCreate();
      } else if (res?.data?.data.length) {
        res?.data?.data.map((item: contactType) => {
          if (item.name == options.github) {
            setGithub(item);
          }
          if (item.name == options.linkedin) {
            setLinkedin(item);
          }
          if (item.name == options.whatsapp) {
            setWhatsapp(item);
          }
        });
      }
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
        <div className={styles.title}>{options.github}</div>
        <div className={styles.sub}>
          <input type="text" name={github.name} value={github.link} onChange={handleChange} className={styles.input} />
          <DefaultToogle value={github.active} handleChange={handleToogle} name={github.name} />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>{options.linkedin}</div>
        <div className={styles.sub}>
          <input type="text" name={linkedin.name} value={linkedin.link} onChange={handleChange} className={styles.input} />
          <DefaultToogle value={linkedin.active} handleChange={handleToogle} name={linkedin.name} />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>{options.whatsapp}</div>
        <div className={styles.sub}>
          <input type="text" name={whatsapp.name} value={whatsapp.link} onChange={handleChange} className={styles.input} />
          <DefaultToogle value={whatsapp.active} handleChange={handleToogle} name={whatsapp.name} />
        </div>
      </div>
      <div className={styles.btn} onClick={handleUpdate}>
        Update
      </div>
    </div>
  );
}

export default EditContactUs;
