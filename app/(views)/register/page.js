"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "@styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { toast } from "react-toastify";

export default function Register() {
  const [show, setShow] = useState({
    password: false,
    cpassword: false,
  });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: yup.object({
      username: yup.string().trim().required("Required"),
      email: yup
        .string()
        .trim()
        .email("Invalid email address")
        .required("Required"),
      password: yup
        .string()
        .trim()
        .min(8, "Must be 8 characters long or more")
        .required("Required"),
      cpassword: yup
        .string()
        .trim()
        .min(8, "Must be 8 characters long or more")
        .required("Required"),
    }),
    onSubmit: onSubmit,
  });

  async function onSubmit(values) {
    if (values.password !== values.cpassword) {
      formik.errors.cpassword = "Passwords not match!";
      return null;
    }
    // alert(JSON.stringify(values, null, 2));
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch(`${process.env.HOST_URL}/api/auth`, options)
      .then((res) => res.json())
      .then((data) => {
        toast.success("Successfully registered", {
          theme: "dark",
          draggable: true,
          draggableDirection: "x",
        });
        if (data) router.push(`${process.env.HOST_URL}/login`);
      });
  }

  return (
    <section className="w-3/4 mx-auto flex flex-col gap-10">
      <div className="title">
        <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
        <p className="w-3/4 mx-auto text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ipsum,
          numquam.
        </p>
      </div>

      {/* form starts */}
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div className={styles.input_group}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={styles.input_text}
            {...formik.getFieldProps("username")}
          />
          <span className="icon flex items-center px-4">
            <HiOutlineUser size={22} />
          </span>
          {formik.touched.username && formik.errors.username ? (
            <span className="absolute left-0 -bottom-6 text-rose-600 font-semibold">
              {formik.errors.username}
            </span>
          ) : null}
        </div>

        <div className={styles.input_group}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input_text}
            {...formik.getFieldProps("email")}
          />
          <span className="icon flex items-center px-4">
            <HiAtSymbol size={22} />
          </span>
          {formik.touched.email && formik.errors.email ? (
            <span className="absolute left-0 -bottom-6 text-rose-600 font-semibold">
              {formik.errors.email}
            </span>
          ) : null}
        </div>

        <div className={styles.input_group}>
          <input
            type={show.password ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="new-password"
            className={styles.input_text}
            {...formik.getFieldProps("password")}
          />
          <span className="icon flex items-center px-4">
            <HiFingerPrint
              size={22}
              onClick={() => setShow({ ...show, password: !show.password })}
            />
          </span>
          {formik.touched.password && formik.errors.password ? (
            <span className="absolute left-0 -bottom-6 text-rose-600 font-semibold">
              {formik.errors.password}
            </span>
          ) : null}
        </div>

        <div className={styles.input_group}>
          <input
            type={show.cpassword ? "text" : "password"}
            name="cpassword"
            id="cpassword"
            placeholder="Confirm Password"
            autoComplete="new-password"
            className={styles.input_text}
            {...formik.getFieldProps("cpassword")}
          />
          <span className="icon flex items-center px-4">
            <HiFingerPrint
              size={22}
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            />
          </span>
          {formik.touched.cpassword && formik.errors.cpassword ? (
            <span className="absolute left-0 -bottom-6 text-rose-600 font-semibold">
              {formik.errors.cpassword}
            </span>
          ) : null}
        </div>

        {/* Login buttons */}
        <div className="input-button">
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </div>
      </form>
      {/* form ends */}

      <p className="text-center text-gray-400">
        Already had an account?
        <Link href={"/login"} className="text-blue-500 font-bold px-2">
          Login
        </Link>
      </p>
    </section>
  );
}
