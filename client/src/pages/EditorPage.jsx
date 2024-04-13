import React from "react";
import { useUserContext } from "../contexts/userContext";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/EditBlog";
import PublishForm from "../components/PublishForm";
import { useEditorContext } from "../contexts/blogContext";
  
const Editor = () => {
  const { editorState } = useEditorContext();
  const {
    userAuth: { access_token },
  } = useUserContext();
  return (
    <>
      {access_token === null ? (
        <Navigate to="/signin" />
      ) : editorState === "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </>
  );
};

export default Editor;
