export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 200,
  },

  {
    title: "Name",
    dataIndex: "name",
    width: 240,
  },

  {
    title: "Gender",
    dataIndex: "gender",
    width: 100,
  },

  {
    title: "Location",
    dataIndex: "location",
    width: 200,
  },

  {
    title: "Age",
    dataIndex: "age",
    width: 70,
  },

  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Picture",
    dataIndex: "picture",
    render: (t, item) => <img src={`${item.picture}`} />,
  },
];
