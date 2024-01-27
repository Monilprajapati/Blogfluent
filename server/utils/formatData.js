import jwt from "jsonwebtoken";

const formatData = (user) => {
  const access_token = jwt.sign({ _id: user._id }, process.env.SECRET_ACCESS_KEY, {
    expiresIn: "1d",
  });
  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

export default formatData;
