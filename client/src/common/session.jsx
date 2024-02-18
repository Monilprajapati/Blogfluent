const storeInSession = (key, value) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
};

const lookInSession = (key) => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(key);
  }
};

const removeFromSession = (key) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

const logOutUser = () => {
  if (typeof window !== "undefined") {
    sessionStorage.clear();
  }
};

export { storeInSession, lookInSession, removeFromSession, logOutUser };
