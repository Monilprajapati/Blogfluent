const URL = import.meta.env.VITE_SERVER_URL;

const register = async (userData) => {
  try {
    const response = await fetch(`${URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const login = async (userData, setLoggedIn) => {
  try {
    const response = await fetch(`${URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    // const token = await data.token;

    // localStorage.setItem("token", token);
    // setToken(token);
    setLoggedIn(true);

    return { status: response.status, data: data };
  } catch (error) {
    console.log(error);
  }
};

export { register, login };
