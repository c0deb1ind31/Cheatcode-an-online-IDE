import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div className="w-screen h-screen flex">
      <div className="flex-1 flex items-center justify-center">
        <Logo />
      </div>
      <div className="flex-1 bg-black flex items-center justify-center">
        <Link to={"#"}>
          <Button className="space-x-2">
            <Icon icon="mdi:github" fontSize={20} />
            <span>Signin with github</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
