import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateUsername from "../utils/generateUsername.js";
import formatData from "../utils/formatData.js";
import { getAuth } from "firebase-admin/auth";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// This is a controller function to signin the user
export const signin = async (req, res) => {
  // Here we are getting the data from frontend
  let { email, password } = req.body;
  // validation of the data
  if (!email.length) {
    return res.status(403).json({ error: "Email is required" });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is not valid" });
  }
  if (!password.length) {
    return res.status(403).json({ error: "Password is required" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter",
    });
  }

  // Here we are finding the user by email
  User.findOne({ "personal_info.email": email })
    .then((user) => {
      // if user is not found
      if (!user) {
        return res.status(403).json({ error: "Email is not registered" });
      }
      // if user is found then we are comparing the password
      bcrypt.compare(password, user.personal_info.password, (result) => {
        // if password is correct
        if (result) {
          return res.status(200).json(formatData(user));
        } else {
          return res.status(403).json({ error: "Password is incorrect" });
        }
      });
    })
    .catch((err) => {
      return res.status(403).json({ error: err.message });
    });
};

// This is a controller function to signup the user
export const signup = async (req, res) => {
  // Here we are getting the data from frontend
  let { fullname, email, password } = req.body;
  // validation of the data
  if (fullname.length < 3 || fullname.length > 20) {
    return res
      .status(403)
      .json({ error: "Fullname must be between 3 to 20 characters" });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Email is required" });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is not valid" });
  }
  if (!password.length) {
    return res.status(403).json({ error: "Password is required" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter",
    });
  }

  // Here we are hashing the password and generating the username from it's email
  bcrypt.hash(password, 10, async (hash_password) => {
    let username = await generateUsername(email);

    // Here we are creating the user
    let user = new User({
      // Adding the data to the user model
      personal_info: {
        fullname,
        email,
        password: hash_password,
        username,
      },
    });

    // Saving the user to the database
    user
      .save()
      // If user is saved successfully
      .then((u) => {
        return res.status(200).json(formatData(u));
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(403).json({ error: "Email is already registered" });
        }
        return res.status(403).json({ error: err.message });
      });
  });
};

// This is a controller function to signin the user with google
export const googleAuth = async (req, res) => {
  // console.log("runn");
  // Here we are getting the access_token from the frontend
  let { access_token } = req.body;

  // Here we are verifying the access_token by getAuth() firebase admin` method
  getAuth()
    .verifyIdToken(access_token)
    // If the token is verified by Firebase Auth
    .then(async (decodedToken) => {
      // Here we are getting the email, name and picture from the decodedToken from firebase
      let { email, name, picture } = decodedToken;
      // Replacing the picture size from 96 to 384
      picture = picture.replace("s96-c", "s384-c");

      // Here we are finding the user by email if it is exist or not
      let user = await User.findOne({ "personal_info.email": email })
        .select(
          "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
        )
        .then((u) => {
          console.log("From: User is already Exists", u);
          return u || null;
        })
        .catch((err) => {
          return res.status(500).json({ "error:": err.message });
        });

      // If user is found
      if (user) {
        // If user is not registered with google -- Checking through the property in User model
        if (!user.google_auth) {
          return res.status(403).json({
            error:
              "Email is already registered with google please signup with password",
          });
        } else {
          // console.log("From: User is already Exists", user);
          return res.status(200).json(formatData(user));
        }
      } else {
        // If user is not found then we will create new user
        // Generating username
        let username = await generateUsername(email);
        // Creating the user
        user = new User({
          personal_info: {
            fullname: name,
            email,
            profile_img: picture,
            username,
          },
          google_auth: true, // Making this field true to check if user is registered with google
        });
        // Saving the user to the database
        await user
          .save()
          .then((u) => {
            user = u;
          })
          .catch((err) => {
            return res.status(403).json({ error: err.message });
          });
        // console.log(user);
        return res.status(200).json(formatData(user));
      }
    })
    .catch((err) => {
      return res.status(403).json({ error: err.message });
    });
};
