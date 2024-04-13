import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserAuthForm from "./pages/UserAuthForm";
import { lookInSession } from "./common/session";
import Editor from "./pages/EditorPage";
import { useUserContext } from "./contexts/userContext";
import { EditorContextProvider } from "./contexts/blogContext";
import HomePage from "./pages/HomePage";

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
        <Route index element={<HomePage />} />
        <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="signup" element={<UserAuthForm type="sign-up" />} />
      </Route>
    </Routes>
  );
};

export default App;
