import React, { ChangeEvent, useRef } from "react";
import styles from "./style.module.scss";
import Image from "next/image";

type props = {
  id: string;
  image: string;
  handleImage: (e: ChangeEvent<HTMLInputElement>, id?: string) => void;
  handleRemove: (e: string) => void;
};

function ProfileImageBox(props: props) {
  const ref = useRef<HTMLInputElement>(null);
  const { image, handleImage, id, handleRemove } = props;

  const handleClick = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>{image.length ? <Image src={image} className={styles.image} width={100} height={100} alt="" /> : null}</div>
      <input type="file" ref={ref} onChange={(e) => handleImage(e, id)} className={styles.input} />
      <div className={styles.btn_group}>
        <div className={styles.btn} onClick={handleClick}>
          {image.length ? "Change" : "Upload"}
        </div>
        <div className={styles.btn} onClick={() => handleRemove(id)}>
          Remove
        </div>
      </div>
    </div>
  );
}

export default ProfileImageBox;
