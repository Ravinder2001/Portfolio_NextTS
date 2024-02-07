import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

import DefaultToogle from "../ToogleBtn/ToogleBtn";
import Loader from "../Loader/Loader";
import TechSelectModal from "../TechBox/TechBox";
import Data from "@/utils/IconList";
import LucideIcons from "@/icons/LucideIcons";

import styles from "./style.module.scss";

type SkillType = {
  tech_name: string;
  image: string;
  _id: string | number;
  isSelected: boolean;
}[];

type props = {
  data:
    | {
        _id?: string;
        name: string;
        active: boolean;
      }
    | undefined;
  handleToogle: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
};

function EditSkillsBox(props: props) {
  const { data: session } = useSession();

  const [skills, setSkills] = useState<SkillType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [iconModal, setIconModal] = useState<boolean>(false);

  const addNewTech = (id: string | number) => {
    setSkills((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return { ...item, isSelected: true };
        } else {
          return item;
        }
      });
    });
  };

  const removeTechStack = (id: string | number, name: string) => {
    if (typeof id == "number") {
      setSkills((prev) => {
        return prev.map((item) => {
          if (item._id === id) {
            return { ...item, isSelected: false };
          } else {
            return item;
          }
        });
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to remove ${name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.delete(`/api/skill/${id}`);

            if (res?.status == 200) {
              setSkills((prev) => {
                return prev.map((item) => {
                  if (item._id === id) {
                    return { ...item, isSelected: false };
                  } else {
                    return item;
                  }
                });
              });
              Swal.fire({
                title: "Deleted!",
                text: "Skill has been deleted.",
                icon: "success",
              });
            }
          } catch (error: any) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }
      });
    }
  };

  const handleSubmit = async () => {
    if (submitLoading) {
      return;
    }
    let techTempStack: any[] = [];
    skills.map((item) => {
      if (item.isSelected) {
        techTempStack.push({
          name: item.tech_name,
          image: item.image,
          relation_id: session?.user.name,
          active: true,
          _id: item._id,
        });
      }
    });
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
          setSubmitLoading(true);
          const res = await axios.post("/api/skill", techTempStack);

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
        } finally {
          setSubmitLoading(false);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const FetchExistingSkills = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/skill");
      if (res?.status == 200) {
        res?.data?.data.forEach((item: any) => {
          setSkills((prevTechStack) =>
            prevTechStack.map((tech) => (tech.tech_name === item.name ? { ...tech, _id: item._id, isSelected: true } : tech))
          );
        });
      }
    } catch (err: any) {
      console.log(err.message);
    }
    setLoading(false);
  };

  const handleIconModal = () => {
    setIconModal(!iconModal);
  };
  
  useEffect(() => {
    FetchExistingSkills();
    Data.map((item) => setSkills((prev) => [...prev, { ...item, isSelected: false }]));
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>Skills</div>
        <div>
          <DefaultToogle value={props.data?.active ?? true} handleChange={(e) => props.handleToogle(e, props.data?._id ?? "")} name="" />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className={styles.box}>
            <div className={styles.label}>Tech Stacks</div>
            <div className={styles.add} onClick={handleIconModal}>
              +
            </div>
            <div className={styles.techBox}>
              {skills.map((tech: any) => {
                return tech.isSelected ? (
                  <div key={tech._id} className={tech.isSelected ? styles.tech_selected : styles.tech}>
                    <Image src={tech.image} width={50} height={50} className={styles.tech_image} alt="" />
                    <div className={styles.tech_name}>{tech.tech_name}</div>
                    <div
                      className={styles.tech_name}
                      onClick={() => {
                        removeTechStack(tech._id, tech.tech_name);
                      }}
                    >
                      <LucideIcons name="delete" color="red" />
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          <div className={styles.btn} onClick={handleSubmit}>
            {submitLoading ? "loading..." : "Submit"}
          </div>
          <TechSelectModal open={iconModal} handleModal={handleIconModal} list={skills} onSelect={addNewTech} onDeSelect={() => {}} />
        </div>
      )}
    </div>
  );
}

export default EditSkillsBox;
