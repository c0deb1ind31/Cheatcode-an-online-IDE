import { useAuthContext } from "@/context/userContext";
import { useEffect } from "react";

type UserType = {
  email: string;
  uid: string;
  name: string;
  picture: string;
};

export default function useAuth() {
  const { isLoggedin, user, setAuth } = useAuthContext();
  useEffect(() => {
    const item = localStorage.getItem("authState");
    if (item) {
      const parsedData: UserType = JSON.parse(item);
      setAuth({ isLoggedin: true, user: parsedData });
    }
  }, [setAuth]);

  function logout() {
    localStorage.removeItem("authState");
    setAuth({ isLoggedin: false, user: null });
  }
  function login(userData: UserType) {
    const data = {
      email: userData.email,
      uid: userData.uid,
      name: userData.name,
      picture: userData.picture,
    };
    localStorage.setItem("authState", JSON.stringify(data));
    setAuth({ isLoggedin: true, user: data });
  }
  return { isLoggedin, user, logout, login };
}
