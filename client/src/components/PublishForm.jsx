import React from "react";
import { useEditorContext } from "../contexts/blogContext";
import AnimationWrapper from "../common/AnimationWrapper";
import toast, { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Tags from "./Tags";

const PublishForm = () => {
  let characterLimit = 200;
  const {
    blog,
    blog: { title, des, banner, tags },
    setBlog,
    setEditorState,
  } = useEditorContext();

  let tagLimit = 5;
  // Close the publish form
  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({
      ...blog,
      title: input.value,
    });
  };

  const handleBlogDesChange = (e) => {
    let input = e.target;
    setBlog({
      ...blog,
      des: input.value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      let tag = e.target.value;
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({
            ...blog,
            tags: [...tags, tag],
          });
          e.target.value = "";
        }
      } else {
        toast.error(`You can only add ${tagLimit} tags`);
      }
    }
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster />

        <button
          className="w-12 h-12 absolute right-[5vw] top-[5%] lg:top-[10%] z-10"
          onClick={handleCloseEvent}
        >
          <IoMdClose className="w-full h-full" />
        </button>
        <div className="max-w-[550px]">
          <p className="text-dark-grey mb-1">Preview</p>
          <div className="w-full aspect-video rounded-lg mb-3 overflow-hidden bg-grey mt-4">
            <img src={banner} alt="" />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>

        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            defaultValue={title}
            className="input-box pl-4"
            onChange={handleBlogTitleChange}
          />
          <p className="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>
          <textarea
            maxLength={characterLimit}
            defaultValue={des}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleBlogDesChange}
            onKeyDown={handleKeyDown}
          ></textarea>

          <p className="mt-1 text-dark-grey text-sm text-right">
            {characterLimit - des.length} characters left
          </p>

          <p className="text-dark-grey mb-2 mt-9">
            Topis (Will help you to get the reach easily)
          </p>

          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Type your topic here"
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={handleAddTag}
            />
            {tags.map((tag, index) => (
              <Tags key={index} tagIndex={index} tag={tag} />
            ))}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
