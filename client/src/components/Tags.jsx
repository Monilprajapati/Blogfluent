import React from "react";
import { IoMdClose } from "react-icons/io";
import { useEditorContext } from "../contexts/blogContext";

const Tags = ({ tag, tagIndex }) => {
  let {
    blog,
    blog: { tags },
    setBlog,
  } = useEditorContext();

  const addEditable = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };

  const handleEdit = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      let currentTag = e.target.innerText;

      tags[tagIndex] = currentTag;
      setBlog({
        ...blog,
        tags,
      });
      console.log(tags);
      e.target.setAttribute("contentEditable", false);
    }
  };

  const hadleTagDelete = (e) => {
    tags = tags.filter((t) => t !== tag);
    setBlog({
      ...blog,
      tags,
    });
  };

  return (
    <div className="mt-2 mr-2 px-5 py-3 bg-white rounded-full inline-block hover:bg-opacity-50">
      <div className="flex items-center gap-2">
        <p
          className="outline-none focus:outline-none"
          onKeyDown={handleEdit}
          onClick={addEditable}
        >
          {tag}
        </p>
        <button className="cursor-pointer" onClick={hadleTagDelete}>
          <IoMdClose
            className=" 
        text-xl
        pointer-events-none"
          />
        </button>
      </div>
    </div>
  );
};

export default Tags;
