import React from "react";
import shortLogo from "../imgs/shortLogo.png";
import defaultBanner from "../imgs/blog-banner.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/AnimationWrapper";
import { uploadImage } from "../common/aws";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const BlogEditor = () => {
  let blogBannerRef = useRef();

  const handleBannerUpload = (e) => {
    let loading = toast.loading("Uploading...");
    const img = e.target.files[0];
    console.log(img);
    if (img) {
      uploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loading);
            toast.success("Uploaded successfully");
            blogBannerRef.current.src = url;
          }
        })
        .catch((error) => {
          toast.dismiss(loading);
          console.log(error);
          return toast.error("Failed to upload");
        });
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
  }

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
          <Toaster />
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white hover:opacity-80 border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  ref={blogBannerRef}
                  src={defaultBanner}
                  className="z-20"
                  alt=""
                />
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  id="uploadBanner"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
            <textarea
              placeholder="Blog Title"
              className="text-4xl bg-red font-medium w-full h-20 outline-none resize-none  mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
