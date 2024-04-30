import { createContext, useContext } from "react";
import { useState } from "react";
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({});
  return (
    <UserContext.Provider
      value={{
        userAuth,
        setUserAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUserContext must be a UserContextProvider. Make sure the component is wrapped in UserContextProvider"
    );
  }
  return context;
};

export { useUserContext, UserContextProvider };
