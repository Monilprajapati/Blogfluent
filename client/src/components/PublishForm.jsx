import React from "react";
import { useEditorContext } from "../contexts/blogContext";
import AnimationWrapper from "../common/AnimationWrapper";
import { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const PublishForm = () => {
  const { setEditorState } = useEditorContext();

  const handleCloseEvent = () => {
    setEditorState("editor");
  }

  return (
    <AnimationWrapper>
      <section>
        <Toaster />

        <button className="w-12 h-12 absolute right-[5vw] a-10 top-[5%] lg:top-[10%]"
        onClick={handleCloseEvent}
        >
          <IoMdClose className="w-full h-full" />
        </button>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
