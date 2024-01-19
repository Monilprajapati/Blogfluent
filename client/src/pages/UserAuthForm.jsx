import React from "react";
import InputTag from "../components/InputTag";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/AnimationWrapper";

const UserAuthForm = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-h-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-in" ? "Welcome back" : "Create an account"}
          </h1>
          {type != "sing-in" ? (
            <InputTag
              name="username"
              type="text"
              id="username"
              value=""
              placeholder="Username"
              icon="email"
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
          />
          <InputTag
            name="password"
            type="password"
            id="password"
            value=""
            placeholder="Password"
            icon="password"
          />
          <button className="btn-dark center mt-14">
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <span className="text-center">or</span>
            <hr className="w-1/2 border-black" />
          </div>

          {/* google button */}
          <div className="btn-dark flex items-center justify-center gap-3">
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
