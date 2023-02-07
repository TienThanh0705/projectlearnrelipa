import axios from "axios";

const instance = axios.create()

export const get = async (path, params = {}) => {
  const data = await instance.get(path, params);
  return data;
};

export const post = async (path, params = {}) => {
  const data = await instance.post(path, params);
  return data;
};

export const put = async (path, params = {}) => {
  const data = await instance.put(path, params);
  return data;
};

export const patch = async (path, params = {}) => {
  const data = await instance.patch(path, params);
  return data;
};
