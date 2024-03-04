import axios from "axios";

export const uploadImage = async (img) => {
  let imageUrl = null;

  await axios
    .get(import.meta.env.VITE_SERVER_URL + "/api/v1/blog/get-upload-url")
    .then(async ({ data }) => {
      await axios({
        method: "PUT",
        url: data.uploadURL,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: img,
      }).then(() => {
        imageUrl = data.uploadURL.split("?")[0];
      });
    });

  return imageUrl;
};
