import jwt from "jsonwebtoken";

const formatData = (user) => {
  // Here we are creating the access token
  const access_token = jwt.sign({ _id: user._id }, process.env.SECRET_ACCESS_KEY, {
    expiresIn: "1d",
  });
  // Here we are returning the user data with access token to be sent on the client side at the time of SignIn
  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

export default formatData;
