import { nanoid } from "nanoid";
import { s3 } from "../index.js";

const generateUploadUrl = async () => {
  const date = new Date();
  const imageName = `${nanoid()}-${date.getTime()}.jpeg`;
return await s3.getSignedUrlPromise("putObject", {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
    ContentType: "image/jpeg",
    Expires: 1000,
  });
};
export default generateUploadUrl;
