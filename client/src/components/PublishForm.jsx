import React from "react";
import { useEditorContext } from "../contexts/blogContext";
import AnimationWrapper from "../common/AnimationWrapper";
import { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const PublishForm = () => {
  const {
    blog: { banner, title, tags, description },
    setEditorState,
  } = useEditorContext();

  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  return (
    <AnimationWrapper>
      <section className="center">
        <Toaster />

        <button
          className="w-10 h-10 absolute right-[5vw] top-[4%] lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <IoMdClose className="w-full h-full" />
        </button>
        <div>
          <p className="text-dark-grey mb-1">Preview</p>
          <img src={banner} alt="" className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4" />
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
