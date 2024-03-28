"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

import DefaultToogle from "../ToogleBtn/ToogleBtn";
import InputBox from "../InputBox/InputBox";
import RightBox from "./RightBox/RightBox";
import ImageBox from "../ImageBox/ImageBox";
import TechSelectModal from "../TechBox/TechBox";
import Data from "@/utils/IconList";
import { convertToBase64 } from "@/utils/Function";

import styles from "./style.module.scss";

type valuesType = {
  name: string;
  type: string;
  des: string;
  image: string;
  url: string;
  github: string;
  active: boolean;
  isUrlVisible: boolean;
  isGithubVisible: boolean;
  _id?: string;
};
type existingProjectsType = {
  _id: string;
  name: string;
  type: string;
  des: string;
  image: string;
  url: string;
  github: string;
  active: boolean;
  isUrlVisible: boolean;
  isGithubVisible: boolean;
  tech: {
    tech_name: string;
    image: string;
    _id: string;
  }[];
};
type techStackType = {
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

function EditProjectsBox(props: props) {
  const { data: session } = useSession();

  const [values, setValues] = useState<valuesType>({
    name: "",
    type: "",
    des: "",
    image: "",
    url: "",
    github: "",
    active: true,
    isUrlVisible: true,
    isGithubVisible: true,
  });
  const [techStack, setTechStack] = useState<techStackType>([]);
  const [existingProjects, setExistingProjects] = useState<existingProjectsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isImageChange, setImageChange] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [iconModal, setIconModal] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const res = await convertToBase64(e.target.files[0]);
      setValues((prev) => ({ ...prev, image: res }));
      setImageChange(true);
    }
  };
  const addNewTech = (id: string | number) => {
    setTechStack((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return { ...item, isSelected: true };
        } else {
          return item;
        }
      });
    });
  };

  const removeProjectLogo = (id: string) => {
    setValues((prev) => ({ ...prev, image: "" }));
  };
  const removeTechStack = (id: string | number) => {
    setTechStack((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return { ...item, isSelected: false };
        } else {
          return item;
        }
      });
    });
  };

  const handleEditClick = (e: existingProjectsType) => {
    setTechStack((prev) => prev.map((tech) => (tech.isSelected ? { ...tech, isSelected: false } : tech)));
    setValues({ _id: e._id, name: e.name, type: e.type, des: e.des, image: e.image, active: e.active, url: e.url, github: e.github,isGithubVisible:e.isGithubVisible,isUrlVisible:e.isUrlVisible });
    e.tech.forEach((item) => {
      setTechStack((prevTechStack) => prevTechStack.map((tech) => (tech.tech_name === item.tech_name ? { ...tech, isSelected: true } : tech)));
    });
  };

  const handleSubmit = async () => {
    if (submitLoading) {
      return;
    }
    let techTempStack: any[] = [];
    techStack.map((item) => {
      if (item.isSelected) {
        techTempStack.push({
          tech_name: item.tech_name,
          image: item.image,
        });
      }
    });
    let body = {
      ...values,
      tech: techTempStack,
      relation_id: session?.user.name,
      isImageChange,
    };
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
          const res = await axios.post("/api/project", body);

          if (res?.status == 200) {
            setImageChange(false);
            Swal.fire({
              icon: "success",
              title: res?.data?.message,
            });
          }
        } catch (error: any) {
          FetchProductList();
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

  const handleToogle = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.patch(`/api/project/${id}`, {
            active: !e.target.checked,
          });

          if (res?.status == 200) {
            setExistingProjects((prev) => {
              return prev.map((item) => {
                if (item._id == id) {
                  return { ...item, active: !e.target.checked };
                } else {
                  return item;
                }
              });
            });
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

  const FetchProductList = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/project");
      if (res.status == 200) {
        setExistingProjects(res?.data?.data);
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
    FetchProductList();
    Data.map((item) => setTechStack((prev) => [...prev, { ...item, isSelected: false }]));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>Projects</div>
        <div>
          <DefaultToogle value={props.data?.active ?? true} handleChange={(e) => props.handleToogle(e, props.data?._id ?? "")} name="" />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.box}>
            <div className={styles.label}>Project Name</div>
            <InputBox
              name="name"
              value={values.name}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="text"
              placeholder="Project Name"
            />
          </div>
          <div className={styles.box}>
            <div className={styles.label}>Type</div>
            <InputBox
              name="type"
              value={values.type}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="text"
              placeholder="Type"
            />
          </div>

          <div className={styles.box}>
            <div className={styles.label}>Description</div>
            <InputBox
              name="des"
              value={values.des}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="textarea"
              placeholder="Description"
              row={3}
            />
          </div>
          <div className={styles.box}>
            <div className={styles.urlBox}>
              <div className={styles.label}>Deployed URL</div>
              <DefaultToogle
                name="isUrlVisible"
                value={values.isUrlVisible}
                handleChange={(e) => {
                  setValues((prev) => ({ ...prev, isUrlVisible: e.target.checked }));
                }}
              />
            </div>
            <InputBox
              name="url"
              value={values.url}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="text"
              placeholder="Paste the deployment URL"
            />
          </div>
          <div className={styles.box}>
            <div className={styles.urlBox}>
              <div className={styles.label}>Github Link</div>
              <DefaultToogle
                name="isGithubVisible"
                value={values.isGithubVisible}
                handleChange={(e) => {
                  setValues((prev) => ({ ...prev, isGithubVisible: e.target.checked }));
                }}
              />
            </div>
            <InputBox
              name="github"
              value={values.github}
              handleTextAreaChange={handleTextAreaChange}
              handleChange={handleChange}
              type="text"
              placeholder="Paste the repo link"
            />
          </div>
          <div className={styles.box}>
            <div className={styles.label}>Project Logo</div>
            <ImageBox handleImage={handleImage} image={values.image} handleRemove={removeProjectLogo} id="" />
          </div>
          <div className={styles.box}>
            <div className={styles.label}>Tech Stacks</div>
            <div className={styles.add} onClick={handleIconModal}>
              +
            </div>
            <div className={styles.techBox}>
              {techStack.map((tech, index) => {
                return tech.isSelected ? (
                  <div key={tech._id} className={tech.isSelected ? styles.tech_selected : styles.tech}>
                    <Image src={tech.image} width={50} height={50} className={styles.tech_image} alt="" />
                    <div className={styles.tech_name}>{tech.tech_name}</div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          <div className={styles.btn} onClick={handleSubmit}>
            {submitLoading ? "loading..." : "Submit"}
          </div>
        </div>
        <div className={styles.right}>
          <RightBox
            FetchProductList={FetchProductList}
            existingProjects={existingProjects}
            handleEditClick={handleEditClick}
            loading={loading}
            handleToogle={handleToogle}
          />
        </div>
      </div>
      <TechSelectModal open={iconModal} handleModal={handleIconModal} list={techStack} onSelect={addNewTech} onDeSelect={removeTechStack} />
    </div>
  );
}

export default EditProjectsBox;
