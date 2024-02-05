"use client";
import SVGIcons from "@/icons/SVGIcons";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import { ENVConfig } from "@/utils/Config";

type DataType = {
  _id: string;
  name: string;
  link: string;
};

function ContactBox() {
  const [data, setData] = useState<DataType[]>([]);

  const FetchLinks = async () => {
    const res = await axios.get(`/api/getPortfolioData/contact`);
    if (res?.data?.data) {
      setData(res?.data?.data);
    } else {
      throw new Error("Something went wrong");
    }
  };
  const handleClick = (link: string) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    FetchLinks();
  }, []);
  return (
    <div className={styles.container}>
      {data.map((contact) => (
        <div data-aos="fade-up" className={styles.box} key={contact._id} onClick={() => handleClick(contact.link)}>
          <SVGIcons name={contact.name} />
        </div>
      ))}
    </div>
  );
}

export default ContactBox;
