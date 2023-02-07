import clsx from "clsx";
import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { registerSchema } from "./partials/registerForm";
import "antd/dist/reset.css";
import styles from "./styles.module.scss";
import Head from "next/head";
import DefaultLayout from "../../layout/defaultLayout";

const yupSync = {
  async validator({ field }, value) {
    await registerSchema.validateSyncAt(field, { [field]: value });
  },
};

const FormYupAntd = () => {
  const [componentSize, setComponentSize] = useState("default");
  const showData = (data) => {
    console.log(data);
    alert("thành công");
  };

  const [form] = Form.useForm();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Head>
        <title>Form with Yup and Antd</title>
      </Head>

      <DefaultLayout>
        <div className={clsx(styles.form)}>
          <Form
            className={clsx(styles.form_content)}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            form={form}
            name="form1"
            onFinish={showData}
          >
            <Form.Item name="fullName" label="Name" rules={[yupSync]}>
              <Input placeholder="Please input your name" />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[yupSync]}>
              <Input placeholder="Please input your email" />
            </Form.Item>

            <Form.Item name="phoneNumber" label="Phone" rules={[yupSync]}>
              <Input
                type="number"
                controls={false}
                placeholder="Please input your phoneNumber"
              />
            </Form.Item>

            <Form.Item
              name="file"
              wrapperCol={{ offset: 6, span: 16 }}
              rules={[yupSync]}
              className={clsx(styles.upload)}
            >
              <Upload maxCount={1} method="get">
                <Button>Upload File</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              className={clsx(styles.submit)}
              wrapperCol={{ offset: 6, span: 16 }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </DefaultLayout>
    </>
  );
};
export default FormYupAntd;
