import React from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import { Link } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import { UserContext } from "../App";
import { useContext } from "react";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {
  const {
    setUserAuth,
    userAuth: { username },
  } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({access_token : null})
  }
  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{
        duration: 0.2,
      }}
    >
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <Link to="/editor" className="flex gap-2 items-center link hover:rounded-none md:hidden pl-8 py-4">
          <MdEditDocument className="text-black" />
          <span className="mt-0.5">Write</span>
        </Link>
        <Link to={`/user/${username}`} className="link hover:rounded-none pl-8 py-4">
          Profile
        </Link>
        <Link to="/dashboard/blogs" className="link hover:rounded-none pl-8 py-4">
          Dashboard
        </Link>
        <Link to="/settings/edit-profile" className="link hover:rounded-none pl-8 py-4">
          Settings
        </Link>

        <span className="absolute border-t border-grey w-full"></span>

        <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
        onClick={signOutUser}
        >
          <h1 className="font-bold text-xl">
            Sign Out
          </h1>
          <p
          className="text-dark-grey"
          >
            @{username}
          </p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
