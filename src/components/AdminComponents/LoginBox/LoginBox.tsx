"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
function LoginBox() {
  const router = useRouter();
  const [values, setValues] = useState<{ username: string; password: string }>({ username: "Ravi", password: "sss" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      if (res?.error) {
        alert("Wrong Credentials");
        return;
      }
      router.push("/admin/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.main_box}>
        <div className={styles.box}>
          <div className={styles.label}>User Id</div>
          <input type="text" value={values.username} onChange={handleChange} name="username" className={styles.input} />
        </div>
        <div className={styles.box}>
          <div className={styles.label}>Password</div>
          <input type="password" value={values.password} onChange={handleChange} name="password" className={styles.input} />
        </div>
        <div className={styles.btn} onClick={handleSubmit}>
          {loading ? "loading..." : "Submit"}
        </div>
      </div>
    </div>
  );
}

export default LoginBox;
