import React from "react";
import shortLogo from "../imgs/shortLogo.png";
import defaultBanner from "../imgs/blog-banner.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/AnimationWrapper";

const BlogEditor = () => {
  const handleBannerUpload = (e) => {
    const img = e.target.files[0];

  };

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
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white hover:opacity-80 border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img src={defaultBanner} className="z-20" alt="" />
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  id="uploadBanner"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
