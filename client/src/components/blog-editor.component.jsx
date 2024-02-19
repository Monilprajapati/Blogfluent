import React from "react";
import shortLogo from "../imgs/shortLogo.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/AnimationWrapper";

const BlogEditor = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="w-12 flex-none">
          <img src={shortLogo} alt="" className="w-full" />
        </Link>

        <p className="hidden md:flex text-black line-clamp-1">New Blog</p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-light py-2">Save draft</button>
          <button className="btn-dark py-2">Publish</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
            
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
