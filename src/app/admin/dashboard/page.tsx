"use client";
import React, { useEffect } from "react";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import styles from "./page.module.scss";
import SectionListBox from "@/components/AdminComponents/SectionListBox/SectionListBox";
import { useSelector } from "react-redux";
import { AppStore, RootState } from "../../../../lib/store";
import EditHeroBox from "@/components/AdminComponents/EditHeroBox/EditHeroBox";
import EditExperienceBox from "@/components/AdminComponents/EditExperienceBox/EditExperienceBox";
import EditProjectsBox from "@/components/AdminComponents/EditProjectsBox/EditProjectsBox";
import EditSkillsBox from "@/components/AdminComponents/EditSkillsBox/EditSkillsBox";
import EditReviewsBox from "@/components/AdminComponents/EditReviewsBox/EditReviewsBox";
import EditAboutBox from "@/components/AdminComponents/EditAboutBox/EditAboutBox";
import EditContactUs from "@/components/AdminComponents/EditContactUs/EditContactUs";

function Page() {
  const sectionList = useSelector((state: RootState) => state.SectionListReducer.list);
  const selected = useSelector((state: RootState) => state.SectionListReducer.selected);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Welcome to Portfolio Dashboard</div>
      <div className={styles.box}>
        <div className={styles.leftBox}>
          <div>Section List</div>
          <div>
            {sectionList.map((section) => (
              <SectionListBox title={section.title} id={section.id} isSelected={section.isSelected} key={section.id} />
            ))}
          </div>
        </div>
        <div className={styles.rightBox}>
          {selected == 1 ? (
            <EditHeroBox />
          ) : selected == 2 ? (
            <EditExperienceBox />
          ) : selected == 3 ? (
            <EditProjectsBox />
          ) : selected == 4 ? (
            <EditSkillsBox />
          ) : selected == 5 ? (
            <EditReviewsBox />
          ) : selected == 6 ? (
            <EditAboutBox />
          ) : (
            <EditContactUs />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
