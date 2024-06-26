import useAuth from "@/hooks/useAuth";
import Logo from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function NavBar() {
  const {user,logout}=useAuth()
  return (
    <div className="p-4 flex justify-between ">
      <Logo/>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={user?.picture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="mr-4 flex flex-col w-[150px] p-0 items-start">
        <button className="hover:bg-zinc-800 w-full text-left px-5 py-2">Account</button>
        <button className="hover:bg-zinc-800 w-full text-left px-5 py-2" onClick={logout}>log out</button>
            
        </PopoverContent>
      </Popover>
    </div>
  );
}
