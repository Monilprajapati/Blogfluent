import React from "react";
import { useState } from "react";
import InputTag from "../components/InputTag";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/AnimationWrapper";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import authUser from "../services/auth";
import { useUserContext } from "../contexts/userContext";
import { authWithGoogle } from "../common/firebase";
const UserAuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useUserContext();

  // Calling APIS and checking the status
  const userAuth = async (serverRoute, formData) => {
    const data = await authUser(serverRoute, formData);
    // console.log("Data from userAuth ");
    setUserAuth(data);
    // console.log(data);
    if (serverRoute === "signin") {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("User Logged in successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } else {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("User Registered successfully");
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
    }
  };
  // Checking and validating inputs and calling the Auth API
  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "sign-in" ? "signin" : "signup";

    const { email, password } = formData;
    if (!email.length) {
      return toast.error("Email is required");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Email is not valid");
    }
    if (type === "register") {
      if (!formData.confirmPassword.length) {
        return toast.error("Confirm Password is required");
      }
      if (formData.confirmPassword !== formData.password) {
        return toast.error("Password and Confirm Password must be same");
      }
    }
    if (!password.length) {
      return toast.error("Password is required");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter"
      );
    }

    if (password.length && email.length) {
      userAuth(serverRoute, formData);
    }
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();

    authWithGoogle()
      .then((user) => {
        let serverRoute = "google-auth";
        let formData = {
          access_token: user.accessToken,
        };

        userAuth(serverRoute, formData);
      })
      .catch((err) => {
        toast.error("trouble login with Google");
        return console.log(err);
      });
  };

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form className="max-h-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-14">
            {type === "sign-in" ? "Welcome back" : "Welcome"}
          </h1>
          {type != "sign-in" ? (
            <InputTag
              name="fullname"
              type="text"
              id="username"
              value=""
              placeholder="Username"
              icon="fullname"
              handleChange={handleChange}
            />
          ) : (
            ""
          )}
          <InputTag
            name="email"
            type="email"
            id="email"
            value=""
            placeholder="Email"
            icon="email"
            handleChange={handleChange}
          />
          <InputTag
            name="password"
            type="password"
            id="password"
            value=""
            placeholder="Password"
            icon="password"
            handleChange={handleChange}
          />
          <button className="btn-dark center mt-14" onClick={handleSubmit}>
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <span className="text-center">or</span>
            <hr className="w-1/2 border-black" />
          </div>

          {/* google button */}
          <div
            className="btn-dark flex items-center justify-center gap-3"
            onClick={handleGoogleAuth}
          >
            <FcGoogle className="text-[18px]" />
            {type.replace("-", " ")} with Google
          </div>

          <p className="mt-6 text-dark-grey text-xl text-center">
            {type === "sign-in" ? (
              <>
                Don't have an account?
                <Link
                  to="/signup"
                  className="underline text-black text-xl ml-1"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?
                <Link
                  to="/signin"
                  className="underline text-black text-xl ml-1"
                >
                  Sign in
                </Link>
              </>
            )}
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
