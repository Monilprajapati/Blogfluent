import React, { useEffect } from "react";
import shortLogo from "../imgs/shortLogo.png";
import defaultBanner from "../imgs/blog-banner.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/AnimationWrapper";
import { uploadImage } from "../common/aws";
import { Toaster, toast } from "react-hot-toast";
import { useEditorContext } from "../contexts/blogContext";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools.component";
import {createBlog} from "../services/blog";
import { useUserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const BlogEditor = () => {
  const {
    blog: { title, banner, content, des, tags },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useEditorContext();
  const {
    userAuth: { access_token },
  } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!textEditor.isReady) {
      setTextEditor(
        new EditorJS({
          holderId: "textEditor",
          data: content,
          placeholder: "Start writing your blog...",
          tools: EDITOR_JS_TOOLS,
        })
      );
    }
  }, []);

  const handlePublihsEvent = () => {
    // Here is basic validations
    if (!banner.length) return toast.error("Banner is required");
    if (!title.length) return toast.error("Title is required");

    if (textEditor.isReady) {
      textEditor.save().then((data) => {
        console.log("Saved data:", data);
        if (data.blocks.length) {
          setBlog((prev) => ({
            ...prev,
            content: data,
          }));
          setEditorState("publish");
        } else {
          return toast.error("Write something in the blog to publish");
        }
      });
    }
  };

  const handleBannerUpload = (e) => {
    let loading = toast.loading("Uploading...");
    const img = e.target.files[0];
    if (img) {
      uploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loading);
            toast.success("Uploaded successfully");

            setBlog(
              (prev) => ({
                ...prev,
                banner: url,
              }),
              console.log("banner updated")
            );
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
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog((prev) => ({
      ...prev,
      title: input.value,
    }));
  };

  const handleSaveDraft = async (e) => {
    if (e.target.disabled) {
      return;
    }

    if (!title.length) return toast.error("Title is required to save as draft");

    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        let data = {
          title,
          des,
          banner,
          tags,
          content,
          draft: true,
        };

        let loading = toast.loading("Saving draft..");
        e.target.disabled = true;
        createBlog(data, access_token)
          .then(() => {
            e.target.disabled = false;
            toast.dismiss(loading);
            toast.success("Draft saved successfully");

            setTimeout(() => {
              navigate("/");
              setBlog({
                title: "",
                des: "",
                banner: "",
                tags: [],
                content: [],
              });
            }, 1000);
          })
          .catch((res) => {
            toast.error(res.data.error);
            e.target.disabled = false;
          });
      });
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="w-12 flex-none">
          <img src={shortLogo} alt="" className="w-full" />
        </Link>

        <p className="hidden md:flex text-black line-clamp-1">
          {title.length ? title : "New Blog"}
        </p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-light py-2" onClick={handleSaveDraft}>
            Save draft
          </button>
          <button className="btn-dark py-2" onClick={handlePublihsEvent}>
            Publish
          </button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <Toaster />
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white hover:opacity-80 border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  src={banner ? banner : defaultBanner}
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
              defaultValue={title}
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none  mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>

            <hr className="w-full opacity-10 my-5" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
