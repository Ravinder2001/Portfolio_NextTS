import React, { ChangeEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import Data from "@/utils/IconList";
import styles from "./style.module.scss";
import Image from "next/image";
import InputBox from "../InputBox/InputBox";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
interface props {
  open: boolean;
  handleModal: () => void;
  list: {
    isSelected: boolean;
    image: string;
    tech_name: string;
    _id: string | number;
  }[];
  onSelect: (id: string | number) => void;
  onDeSelect: (id: string | number) => void;
}
function TechSelectModal(props: props) {
  const { open, handleModal, list, onDeSelect, onSelect } = props;
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<{ isSelected: boolean; image: string; tech_name: string; _id: string | number }[]>(list);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (text.length) {
      let newArr = list.filter((item) => item.tech_name.toLocaleLowerCase().includes(text.toLocaleLowerCase()));

      setData(newArr);
    } else {
      setData(list);
    }
  }, [text]);
  return (
    <Modal isOpen={open} style={customStyles} contentLabel="Example Modal">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.heading}>Please select the techonology</div>
          <div onClick={handleModal} className={styles.close}>
            X
          </div>
        </div>
        <InputBox
          value={text}
          handleChange={handleChange}
          type="text"
          placeholder="Search Tech Stack"
          name="Techstacks"
          handleTextAreaChange={() => {}}
        />
        <div className={styles.box}>
          {data.map((tech, index) => (
            <div
              key={tech._id}
              className={tech.isSelected ? styles.tech_selected : styles.tech}
              onClick={
                tech.isSelected
                  ? () => {
                      onDeSelect(tech._id);
                    }
                  : () => {
                      onSelect(tech._id);
                    }
              }
            >
              <Image src={tech.image} width={50} height={50} className={styles.tech_image} alt="" />
              <div className={styles.tech_name}>{tech.tech_name}</div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default TechSelectModal;
