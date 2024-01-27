import User from "../models/User.js";
import {nanoid} from "nanoid";

const generateUsername = async (email) => {
  let username = email.split("@")[0];

  let isUsernameUnique = await User.exists({
    "personal_info.username": username,
  })
    .then((result) => result)
    .catch((err) => false);

    isUsernameUnique ? (username = username + nanoid(4)) : "";
    return username;
};

export default generateUsername;
