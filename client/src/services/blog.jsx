import axios from "axios";

const createBlog = async (data, token) => {
  const URL = import.meta.env.VITE_SERVER_URL;

  try {
    const response = await axios.post(`${URL}/api/v1/blog/create-blog`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.data;
    return res;
  } catch ({ response }) {
    return response;
  }
};

export const getNewBlogs = async () => {
  const URL = import.meta.env.VITE_SERVER_URL;

  try {
    const response = await axios.get(`${URL}/api/v1/blog/latest-blogs`);
    const res = await response.data.blogs;
    return res;
  } catch ({ response }) {
    return response;
  }
};

export const getTrendingBlogs = async () => {
  const URL = import.meta.env.VITE_SERVER_URL;

  try {
    const response = await axios.get(`${URL}/api/v1/blog/trending-blogs`);
    const res = await response.data.blogs;
    return res;
  } catch ({ response }) {
    return response;
  }
};

export default createBlog;
