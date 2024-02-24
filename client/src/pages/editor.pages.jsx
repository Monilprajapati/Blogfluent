import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";

const Editor = () => {
  const [editorState, setEditorState] = useState("editor");
  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  // return access_token === null ? (
  // ) : editorState == "editor" ? (
  //   <BlogEditor/>
  // ) : (
  //   <PublishForm/>
  // );

  if (!access_token) {
    <Navigate to="/signin" />;
  }
  return <>{editorState == "editor" ? <BlogEditor /> : <PublishForm />}</>;
};

export default Editor;
