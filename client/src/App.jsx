import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserAuthForm from "./pages/UserAuthForm";
import { createContext, useContext, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import { UserContextProvider } from "./contexts/userContext";
import { useUserContext } from "./contexts/userContext";
import { EditorContextProvider } from "./contexts/blogContext";

const App = () => {
  const { setUserAuth } = useUserContext();
  useEffect(() => {
    let userInSession = lookInSession("user");
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    } else {
      setUserAuth({ access_token: null });
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/editor"
        element={
          <EditorContextProvider>
            <Editor />
          </EditorContextProvider>
        }
      />
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="signup" element={<UserAuthForm type="sign-up" />} />
      </Route>
    </Routes>
  );
};

export default App;
