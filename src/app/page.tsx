import ExperienceBox from "@/components/ExperienceBox/ExperienceBox";
import Herobox from "@/components/Herobox/Herobox";
import Navbar from "@/components/Navbar/Navbar";
import SVGIcons from "@/icons/SVGIcons";
import React from "react";
import styles from "./page.module.css";
import SkillsBox from "@/components/SkillsBox/SkillsBox";
import ProjectBox from "@/components/ProjectBox/ProjectBox";
import ReviewBox from "@/components/ReviewBox/ReviewBox";
import AboutBox from "@/components/AboutBox/AboutBox";
import ContactBox from "@/components/ContactBox/ContactBox";

function page() {
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
