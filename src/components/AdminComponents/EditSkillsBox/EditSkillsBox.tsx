import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./style.module.scss";
import DefaultToogle from "../ToogleBtn/ToogleBtn";
import StackTable from "../StackTable/StackTable";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import ImageBox from "../ImageBox/ImageBox";
import { convertToBase64 } from "@/utils/Function";
import { nanoid } from "nanoid";
import Loader from "../Loader/Loader";
import InputBox from "../InputBox/InputBox";

type SkillType = {
  _id: string;
  name: string;
  image: string;
  active: boolean;
};

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
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const addNewTech = () => {
    setSkills((prev) => [
      ...prev,
      {
        name: "",
        image: "",
        _id: nanoid(5),
        active: true,
      },
    ]);
  };
  const handleTechNameChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setSkills((prev) => {
      return prev.map((item) => {
        if (item._id == id) {
          return { ...item, name: e.target.value };
        } else {
          return item;
        }
      });
    });
  };
  const handleTechUrlChange = (e: ChangeEvent<HTMLTextAreaElement>, id: string) => {
    setSkills((prev) => {
      return prev.map((item) => {
        if (item._id == id) {
          return { ...item, image: e.target.value };
        } else {
          return item;
        }
      });
    });
  };

  const removeTechStack = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this Skill?",
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
            const newArr = skills.filter((item) => item._id != id);
            setSkills(newArr);
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
  };

  const handleSubmit = async () => {
    if (submitLoading) {
      return;
    }
    let techTempStack: any[] = [];
    skills.map((item) => {
      if (item.image.length) {
        techTempStack.push({
          name: item.name,
          image: item.image,
          relation_id: session?.user.name,
          active: item.active,
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
        setSkills(res?.data?.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    FetchExistingSkills();
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
            <div className={styles.add} onClick={addNewTech}>
              +
            </div>
            <div className={styles.techBox}>
              {skills.map((tech) => (
                <div key={tech._id} className={styles.techContainer}>
                  <input
                    type="text"
                    name={tech._id}
                    value={tech.name}
                    onChange={(e) => handleTechNameChange(e, tech._id)}
                    placeholder="Add Skill Name"
                    className={styles.techInput}
                  />
                  <InputBox
                    name="des"
                    value={tech.image}
                    handleTextAreaChange={(e) => handleTechUrlChange(e, tech._id)}
                    handleChange={() => {}}
                    type="textarea"
                    placeholder="Paste Icon Url"
                    row={3}
                  />
                  <div className={styles.techRebtn} onClick={() => removeTechStack(tech._id)}>
                    Remove
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.btn} onClick={handleSubmit}>
            {submitLoading ? "loading..." : "Submit"}
          </div>
        </div>
      )}
    </div>
  );
}

export default EditSkillsBox;
