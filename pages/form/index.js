import clsx from "clsx";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import DefaultLayout from "../../layout/defaultLayout";
import styles from "./styles.module.scss";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data, alert("thành công"));

  return (
    <>
      <Head>
        <title>Form</title>
      </Head>
      <DefaultLayout>
        <div className={clsx(styles.form)}>
          <form
            className={clsx(styles.form_content)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Full name..."
              {...register("fullName", {
                required: "Full name is required !",
                maxLength: {
                  value: 30,
                  message: "Full name no more than 30 characters !",
                },
              })}
            />
            {errors?.fullName?.message && (
              <p className={clsx(styles.form_err)}>
                {errors?.fullName?.message}
              </p>
            )}

            <input
              placeholder="Email..."
              type="text"
              {...register("email", {
                required: "Email is required !",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Email is avalid !",
                },
              })}
            />
            {errors?.email?.message && (
              <p className={clsx(styles.form_err)}>{errors?.email?.message}</p>
            )}

            <input
              placeholder="Phone number..."
              type="text"
              {...register("phoneNumber", {
                required: "Phone number is required !",
                maxLength: {
                  value: 10,
                  message: "Phone number no more than 10 characters !",
                },
                pattern: {
                  value:
                    /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
                  message: "Phone number does not exist !",
                },
              })}
            />
            {errors?.phoneNumber?.message && (
              <p className={clsx(styles.form_err)}>
                {errors?.phoneNumber?.message}
              </p>
            )}
            <input
              type="file"
              {...register("file", {
                validate: (val) => {
                  if (val.length === 0) {
                    return "File is required";
                  }
                  if (val[0].size / 1024 / 1024 > 2) {
                    return "Files up to 2MB";
                  }
                  return true;
                },
              })}
            />
            {errors?.file?.message && (
              <p className={clsx(styles.form_err)}>{errors?.file?.message}</p>
            )}

            <input type="submit" />
          </form>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Form;
