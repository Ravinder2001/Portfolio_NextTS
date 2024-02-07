"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import styles from "./page.module.scss";
import SectionListBox from "@/components/AdminComponents/SectionListBox/SectionListBox";
import { useDispatch, useSelector } from "react-redux";
import { AppStore, RootState } from "../../../../lib/store";
import EditHeroBox from "@/components/AdminComponents/EditHeroBox/EditHeroBox";
import EditExperienceBox from "@/components/AdminComponents/EditExperienceBox/EditExperienceBox";
import EditProjectsBox from "@/components/AdminComponents/EditProjectsBox/EditProjectsBox";
import EditSkillsBox from "@/components/AdminComponents/EditSkillsBox/EditSkillsBox";
import EditReviewsBox from "@/components/AdminComponents/EditReviewsBox/EditReviewsBox";
import EditAboutBox from "@/components/AdminComponents/EditAboutBox/EditAboutBox";
import EditContactUs from "@/components/AdminComponents/EditContactUs/EditContactUs";
import { signOut } from "next-auth/react";
import axios from "axios";
import { addSectionList, toogleSection } from "../../../../lib/slices/SectionListSlice";
import Swal from "sweetalert2";

function Page() {
  const dispatch = useDispatch();
  const sectionList = useSelector((state: RootState) => state.SectionListReducer.list);
  const selected = useSelector((state: RootState) => state.SectionListReducer.selected);

  const GetFilteredData = (name: string) => {
    let arr = sectionList.find((section) => section.name == name);
    return arr;
  };

  const CreateInitialSection = async () => {
    try {
      await axios.post("/api/section", sectionList);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const FetchSectionDetails = async () => {
    try {
      const res = await axios.get("/api/section");

      if (res?.data.data.length == 0) {
        CreateInitialSection();
      } else if (res?.data.data) {
        dispatch(addSectionList(res?.data.data));
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleToogle = (e: ChangeEvent<HTMLInputElement>, id: string) => {
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
          const res = await axios.patch(`/api/section/${id}`, {
            active: !e.target.checked,
          });

          if (res?.status == 200) {
            dispatch(toogleSection({ id, active: !e.target.checked }));
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

  useEffect(() => {
    FetchSectionDetails();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>Welcome to Portfolio Dashboard</div>
        <div className={styles.logout} onClick={() => signOut()}>
          Logout
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.leftBox}>
          <div>Section List</div>
          <div>
            {sectionList.map((section, index) => (
              <SectionListBox title={section.name} id={index + 1} key={index} />
            ))}
          </div>
        </div>
        <div className={styles.rightBox}>
          {selected == 1 ? (
            <EditHeroBox data={GetFilteredData("Hero")} handleToogle={handleToogle} />
          ) : selected == 2 ? (
            <EditExperienceBox data={GetFilteredData("Experience")} handleToogle={handleToogle} />
          ) : selected == 3 ? (
            <EditProjectsBox data={GetFilteredData("Projects")} handleToogle={handleToogle} />
          ) : selected == 4 ? (
            <EditSkillsBox data={GetFilteredData("Skills")} handleToogle={handleToogle} />
          ) : selected == 5 ? (
            <EditReviewsBox data={GetFilteredData("Reviews")} handleToogle={handleToogle} />
          ) : selected == 6 ? (
            <EditAboutBox data={GetFilteredData("About")} handleToogle={handleToogle} />
          ) : (
            <EditContactUs data={GetFilteredData("Contact Us")} handleToogle={handleToogle} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
