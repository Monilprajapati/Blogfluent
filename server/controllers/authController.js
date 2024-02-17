import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateUsername from "../utils/generateUsername.js";
import formatData from "../utils/formatData.js";
import { getAuth } from "firebase-admin/auth";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

export const signin = async (req, res) => {
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

  User.findOne({ "personal_info.email": email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: "Email is not registered" });
      }
      bcrypt.compare(password, user.personal_info.password, (err, result) => {
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

export const signup = async (req, res) => {
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

  bcrypt.hash(password, 10, async (err, hash_password) => {
    let username = await generateUsername(email);

    let user = new User({
      personal_info: {
        fullname,
        email,
        password: hash_password,
        username,
      },
    });

    user
      .save()
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

export const googleAuth = async (req, res) => {
  let { access_token } = req.body;
  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedToken) => {
      let { email, name, picture } = decodedToken;
      picture = picture.replace("s96-c", "s384-c");
      let user = await User.findOne({ "personal_info.email": email })
        .select(
          "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
        )
        .then((u) => {
          return u || null;
        })
        .catch((err) => {
          return res.status(500).json({ "error:": err.message });
        });

      if (user) {
        if (!user.google_auth) {
          return res.status(403).json({
            error:
              "Email is already registered with google please signup with password",
          });
        }
      } else {
        let username = await generateUsername(email);
        user = new User({
          personal_info: {
            fullname: name,
            email,
            profile_img: picture,
            username,
          },
          google_auth: true,
        });
        await user
          .save()
          .then((u) => {
            user = u;
          })
          .catch((err) => {
            return res.status(403).json({ error: err.message });
          });

          return res.status(200).json(formatData(user));
      }
    }).catch(
      (err) => {
        return res.status(403).json({ error: err.message });
      }
    )
};
