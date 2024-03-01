import { ThemeProvider } from "./context/themeprovider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Oauth from "./pages/oauth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthContextProvider from "./context/userContext";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/Oauth/callback",
      element: <Oauth />,
    },
  ]);

  return (
    <AuthContextProvider>
      <GoogleOAuthProvider clientId="948371723462-4fksdl1ddvl2gtut122rafub5jv7pkk6.apps.googleusercontent.com">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </AuthContextProvider>
  );
}

export default App;
