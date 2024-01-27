import axios from "axios";

const authUser = async (serverRoute, formData) => {
  const URL = import.meta.env.VITE_SERVER_URL;

  try {
    const response = await axios.post(
      `${URL}/api/v1/auth/${serverRoute}`,
      formData
    );
    const data = await response.data;
    console.log(data);
    return data;
  } catch ({ response }) {
    console.log(response);
    return response.data;
  }
};

export default authUser;
