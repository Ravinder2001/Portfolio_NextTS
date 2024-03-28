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
import { ENVConfig } from "@/utils/Config";

export const dynamic = "force-dynamic";

const GetData = async () => {
  const res = await fetch(`${ENVConfig.baseURL}/api/getPortfolioData/section`, { cache: "no-store", next: { revalidate: 5 } });
  if (!res.ok) {
    return { data: null };
  }
  return await res.json();
};

async function page() {
  const { data } = await GetData();

  if (!ENVConfig.baseURL) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      {data.map((item: any) => {
        if (item.active) {
          switch (item.name) {
            case "Hero":
              return <Herobox key={item._id} />;
            case "Experience":
              return <ExperienceBox key={item._id} />;
            case "Projects":
              return <ProjectBox key={item._id} />;
            case "Skills":
              return <SkillsBox key={item._id} />;
            case "Reviews":
              return <ReviewBox key={item._id} />;
            case "About":
              return <AboutBox key={item._id} />;
            default:
              return null; // or any default behavior
          }
        }
        return null;
      })}
    </div>
  );
}

export default page;
