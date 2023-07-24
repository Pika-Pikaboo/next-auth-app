"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@styles/Form.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Required"),
      password: yup
        .string()
        .min(6, "Must be 6 characters long or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const status = await signIn("credentials", {
        redirect: true,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });

      console.log(status);

      if (status.ok) {
        toast.success("Successfully logged in", {
          theme: "light",
          position: toast.TOP_RIGHT,
          draggable: true,
          draggableDirection: "x",
        });
      }
    },
  });

  return (
    <section className="w-3/4 mx-auto flex flex-col gap-10">
      <div className="title">
        <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
        <p className="w-3/4 mx-auto text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ipsum,
          numquam.
        </p>
      </div>

      {/* form starts */}
      <form
        method="post"
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-5"
      >
        <div className={styles.input_group}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input_text}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <span className="icon flex items-center px-4">
            <HiAtSymbol size={22} />
          </span>
          {formik.touched.email && formik.errors.email ? (
            <span className="absolute -bottom-6 text-rose-600 font-semibold left-0">
              {formik.errors.email}
            </span>
          ) : null}
        </div>

        <div className={styles.input_group}>
          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            className={styles.input_text}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <span className="icon flex items-center px-4">
            <HiFingerPrint size={22} onClick={() => setShow(!show)} />
          </span>
          {formik.touched.password && formik.errors.password ? (
            <span className="absolute -bottom-6 text-rose-600 font-semibold left-0">
              {formik.errors.password}
            </span>
          ) : null}
        </div>

        {/* Login buttons */}
        <div className="input-button">
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
        <div className="input-button">
          <button
            type="button"
            className={styles.button_custom}
            onClick={() =>
              signIn("google", {
                callbackUrl: "https://next-auth-app-beige.vercel.app",
              })
            }
          >
            Sign In with Google
            <Image
              src={
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              }
              alt="Google"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="input-button">
          <button
            type="button"
            className={styles.button_custom}
            onClick={() =>
              signIn("github", {
                callbackUrl: "https://next-auth-app-beige.vercel.app",
              })
            }
          >
            Sign In with Github
            <Image
              src={
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              }
              alt="Github"
              width={20}
              height={20}
            />
          </button>
        </div>
      </form>
      {/* form ends */}
      <p className="text-center text-gray-400">
        Dont have an account yet?
        <Link href={"/register"} className="text-blue-500 font-bold px-2">
          Register
        </Link>
      </p>
    </section>
  );
}
