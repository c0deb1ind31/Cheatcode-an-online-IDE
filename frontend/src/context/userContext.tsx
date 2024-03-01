import { PropsWithChildren, createContext, useContext, useState } from "react";

type UserType = {
  email: string;
  uid: string;
  name: string;
  picture: string;
};
const AuthContext = createContext<{
  user: UserType | null;
  isLoggedin: boolean;
  setAuth: (e: { user: UserType | null; isLoggedin: boolean }) => void;
}>({
  user: null,
  isLoggedin: false,
  setAuth: () => {},
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [context, setContext] = useState<{
    user: UserType | null;
    isLoggedin: boolean;
  }>({ user: null, isLoggedin: false });

  return (
    <AuthContext.Provider
      value={{
        ...context,
        setAuth: (e: { user: UserType | null; isLoggedin: boolean }) =>
          setContext(e),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
