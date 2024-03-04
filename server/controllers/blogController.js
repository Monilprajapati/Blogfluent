import generateUploadUrl from "../utils/generateUploadUrl.js";

// Controller for uploading image to S3
export const getUploadImageUrl = async (req, res) => {
  generateUploadUrl()
    .then((url) => {
      console.log(url);
      return res.status(200).json({ uploadURL: url });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};
