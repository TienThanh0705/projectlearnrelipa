import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import "antd/dist/reset.css";
import { LoadingOutlined } from "@ant-design/icons";
import Head from "next/head";
import { useRouter } from "next/router";
import path from "../config/routes";
import Cookies from "js-cookie";
import styles from "../styles/style.module.scss";
import { registerSchema } from "../component/partials/registerLogin";

const yupSync = {
  async validator({ field }, value) {
    console.log(value);
    await registerSchema.validateSyncAt(field, { [field]: value });
  },
};

const Login = () => {
  // Account
  const router = useRouter();
  // const dispatch = useDispatch();
  // const isLoginRedux = useSelector((state) => state.app.isLogin);
  const [isLoading, setIsLoading] = useState(false);
  const [checkMail, setCheckMail] = useState("");
  const [checkPass, setCheckPass] = useState("");
  // const [isLogin, setIsLogin] = useState(isLoginRedux);
  const [componentSize, setComponentSize] = useState("default");
  const [form] = Form.useForm();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const account = {
    email: "thanh@gmail.com",
    password: "01234567",
  };

  const onFinish = (data) => {
    if (data?.email !== account?.email) {
      setCheckMail("Mail is not true");
    }

    if (data?.password !== account?.password) {
      setCheckPass("Password is not true");
    }

    if (
      data?.email !== account?.email &&
      data?.password !== account?.password
    ) {
      alert("Mail and password are not true");
    }

    if (
      data?.email === account?.email &&
      data?.password === account?.password
    ) {
      setIsLoading(true);
      Cookies.set("data",true);
      router.push(path.todo);
    } else {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      {isLoading && (
        <div className="modal_form_loading active">
          <Spin
            spinning={true}
            indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
            delay="300"
          />
        </div>
      )}
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
          onFinish={onFinish}
        >
          <Form.Item name="email" label="Email" rules={[yupSync]}>
            <Input
              placeholder="Please input your email"
              onChange={() => setCheckMail("")}
            />
          </Form.Item>
          <p className={clsx(styles.isError)}>{checkMail}</p>
          <Form.Item name="password" label="PassWord" rules={[yupSync]}>
            <Input.Password
              type="password"
              controls={false}
              placeholder="Please input your password"
              onChange={() => setCheckPass("")}
            />
          </Form.Item>
          <p className={clsx(styles.isError)}>{checkPass}</p>
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
    </>
  );
};
export default Login;
