import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./partials/registerForm";
import styles from "./styles.module.scss";
import Head from "next/head";
import DefaultLayout from "../../layout/defaultLayout";

const FormYup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => console.log(data, alert("thành công"));

  return (
    <>
      <Head>
        <title>Form with Yup</title>
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
              {...register("fullName")}
            />
            {errors?.fullName && <p>{errors?.fullName?.message}</p>}

            <input type="text" placeholder="Email..." {...register("email")} />
            {errors?.email && <p>{errors?.email?.message}</p>}

            <input
              placeholder="Phone number..."
              type="text"
              {...register("phoneNumber")}
            />

            {errors?.phoneNumber && <p>{errors?.phoneNumber?.message}</p>}

            <input type="file" {...register("file")} />
            {errors?.file && <p>{errors?.file?.message}</p>}

            <input type="submit" />
          </form>
        </div>
      </DefaultLayout>
    </>
  );
};

export default FormYup;
