"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-scroll";

import LabelBox from "./LabelBox/LabelBox";

import styles from "./style.module.scss";

function Navbar() {
  const [name, setName] = useState<string>("");

  const fetchName = async () => {
    const res = await axios.get("/api/getPortfolioData/hero?name=true");
    let dbName = res?.data.data.name.split(" ");
    setName(dbName[0]);
  };

  useEffect(() => {
    fetchName();
  }, []);
  
  return (
    <div className={styles.container}>
      <Link activeClass="active" to="Hero" spy={true} smooth={true} offset={-100} duration={500}>
        <span className={styles.left}>
          {name.length ? name : "Portfolio"}.<span className={styles.cast}>dev</span>
        </span>
      </Link>

      <div className={styles.middle}>
        <LabelBox label="Experience" icon="Experience" />
        <LabelBox label="Projects" icon="Project" />
        <LabelBox label="Skills" icon="Skills" />
        <LabelBox label="Reviews" icon="Reviews" />
        <LabelBox label="About" icon="About" />
        <LabelBox label="Contact" icon="Contact" />
      </div>
    </div>
  );
}

export default Navbar;
