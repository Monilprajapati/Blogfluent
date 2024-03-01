import User from "../models/User.js";
import { nanoid } from "nanoid";

const generateUsername = async (email) => {
  let username = email.split("@")[0];

  // Check if username is unique
  let isUsernameUnique = await User.exists({
    "personal_info.username": username,
  })
    .then((result) => result)
    .catch((err) => {
      console.log("Error in Generating username:", err);
    });

  // If username is not unique, append random string to username
  isUsernameUnique ? (username = username + nanoid(4)) : "";
  return username;
};

export default generateUsername;
