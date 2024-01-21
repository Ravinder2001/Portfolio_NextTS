import ExperienceBox from "@/components/ExperienceBox/ExperienceBox";
import Herobox from "@/components/Herobox/Herobox";
import Navbar from "@/components/Navbar/Navbar";
import SVGIcons from "@/icons/SVGIcons";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import SkillsBox from "@/components/SkillsBox/SkillsBox";
import ProjectBox from "@/components/ProjectBox/ProjectBox";
import ReviewBox from "@/components/ReviewBox/ReviewBox";
import AboutBox from "@/components/AboutBox/AboutBox";
import ContactBox from "@/components/ContactBox/ContactBox";
import { ENVConfig } from "@/utils/Config";

function page() {
  if (!ENVConfig.baseURL) {
    return null;
  }
  return (
    <div className={styles.container}>
      <Navbar />
      <Herobox />
      <ExperienceBox />
      <ProjectBox />
      <SkillsBox />
      <ReviewBox />
      <AboutBox />
      <ContactBox />
    </div>
  );
}

export default page;
