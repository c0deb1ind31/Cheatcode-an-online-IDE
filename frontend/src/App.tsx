import { ThemeProvider } from "./context/themeprovider";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Oauth from "./pages/oauth";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/auth/login",
      element: <Login/>
    },
    {
      path: "/auth/Oauth/callback",
      element: <Oauth/>
    },
  ]);
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />

    
    </ThemeProvider>
  );
}

export default App;
