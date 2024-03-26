import { createContext, useContext } from "react";
import { useState } from "react";
const EditorContext = createContext();

const EditorContextProvider = ({ children }) => {
  const [blog, setBlog] = useState({
    title: "",
    banner: "",
    content: [],
    tags: [],
    des: "",
    author: {
      personal_info: {},
    },
  });
  console.log(blog.content)

  const [textEditor, setTextEditor] = useState({
    isReady: false,
  });

  const [editorState, setEditorState] = useState("editor");

  console.log(blog);
  return ( 
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        textEditor,
        setTextEditor,
        editorState,
        setEditorState,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error(
      "useEditorContext must be within a EditorContextProvider. Make sure the component is wrapped in EditorContextProvider"
    );
  }
  return context;
};

export { useEditorContext, EditorContextProvider };
