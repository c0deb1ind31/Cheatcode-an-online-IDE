import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { apiServices } from "@/services/api.services";
import { Icon } from "@iconify/react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export default function Login() {
  const { login, isLoggedin } = useAuth();
  const navigate = useNavigate();
  const googlelogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const data = res.data;
          apiServices
            .createUser(data.id, data.name, data.email)
            .then(() => {
              console.log("User created!!");
              login({
                email: data.email,
                uid: data.id,
                name: data.name,
                picture: data.picture,
              });
              navigate("/");
            })
            .catch((e) => {
              console.log(e)
              console.log("User already exists");
              login({
                email: data.email,
                uid: data.id,
                name: data.name,
                picture: data.picture,
              });
              navigate("/");
            });
        })
        .catch((err) => console.log(err));
    },
  });

  if (isLoggedin) return <Navigate to={"/"} />;
  return (
    <div className="w-screen h-screen flex">
      <div className="flex-1 flex items-center justify-center">
        <Logo />
      </div>
      <div className="flex-1 bg-black flex items-center justify-center">
        <Button className="space-x-2" onClick={() => googlelogin()}>
          <Icon icon="flat-color-icons:google" />{" "}
          <span>Signin with google</span>
        </Button>
      </div>
    </div>
  );
}
