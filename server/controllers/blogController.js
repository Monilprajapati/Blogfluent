import generateUploadUrl from "../utils/generateUploadUrl.js";

export const getUploadImageUrl = async (req, res) => {
  generateUploadUrl()
    .then((url) => {
      res.status(200).json({ uploadURL: url });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};