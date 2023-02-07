import clsx from "clsx";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allUserAPI, changePage } from "../../redux/slice/userDataSlice";
import DefaultLayout from "../../layout/defaultLayout";
import Head from "next/head";
import { columns } from "./partials/columns";
import "antd/dist/reset.css";
import styles from "./style.module.scss";

const ListUser = () => {
  const dataUserRedux = useSelector((state) => state.user.dataUser) ?? [];
  const loading = useSelector((state) => state.user.handleJSX.loading);
  const page = useSelector((state) => state.user.handleJSX.page);
  const dispatch = useDispatch();

  //chuyển trang
  const nextPage = (page) => {
    dispatch(changePage(page));
  };
  //gọi API Redux
  useEffect(() => {
    dispatch(allUserAPI());
  }, [page]);

  return (
    <>
      <Head>USER</Head>
      <DefaultLayout>
        <div className={clsx(styles.form_tabel)}>
          <Table
            className={clsx(styles.tabel)}
            columns={columns}
            dataSource={dataUserRedux}
            bordered
            pagination={{ defaultPageSize: 10, total: 100, onChange: nextPage }}
            scroll={{ y: 530 }}
            loading={loading}
          />
        </div>
      </DefaultLayout>
    </>
  );
};

export default ListUser;
