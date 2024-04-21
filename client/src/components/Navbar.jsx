import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { MdEditDocument } from "react-icons/md";
import { FiBell } from "react-icons/fi";
import shortLogo from "../imgs/shortLogo.png";
import longLogo from "../imgs/longLogo.png";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import UserNavigationPanel from "./UserNavigationPanel";

const Navbar = () => {
  const {
    userAuth: { access_token, profile_img },
  } = useUserContext();
  console.log(profile_img)
  // console.log(access_token)
  const [search, setSearch] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  return (
    <>
      <nav className="navbar font-plusSans">
        <Link to="/" className="w-12 flex-none md:w-52">
          <img src={shortLogo} alt="" className="w-full md:hidden" />
          <img src={longLogo} alt="" className="hidden md:block w-full" />
        </Link>

        <div
          className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show  ${
            search ? "show" : "hide"
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />
          <IoIosSearch className="absolute right-[10%] top-1/2 -translate-y-1/2 text-2xl md:left-5 md:pointer-events-none text-black" />
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto font-plusSans">
          <button
            className="md:hidden w-12 h-12 bg-grey rounded-full flex items-center justify-center"
            onClick={() => setSearch(!search)}
          >
            <IoIosSearch className="text-2xl text-black" />
          </button>

          <Link
            to="/editor"
            className="hidden md:flex items-center justify-center gap-2 link"
          >
            <MdEditDocument className="text-black" />
            <span>Write</span>
          </Link>

          {access_token ? (
            <>
              <Link
                to="/dashboard/notification"
                className="bg-grey rounded-full relative p-3 hover:bg-black/10"
              >
                <FiBell className="text-black text-2xl" />
              </Link>
              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={handleBlur}
              >
                <button className="w-12 h-12 mt-1">
                  <img
                    src={profile_img}
                    alt="userImage"
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
                {userNavPanel && <UserNavigationPanel />}
              </div>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn-dark py-2">
                Sign In
              </Link>
              <Link to="/signup" className="btn-light py-2 hidden md:block">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
