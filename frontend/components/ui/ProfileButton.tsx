"use client";
import { useState, useEffect, useRef } from "react";
import { Settings, LogOut } from "lucide-react";
import { useUser } from "@/components/context/context";
import { delete_cookie } from "@/app/actions/actions";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProfileButton = () => {
  const { userAddress, setUserAddress } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState();
  const node = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSignOut = () => {
    delete_cookie();
    setUserAddress("");
    router.push("/login");
  };

  const handleClickOutside = (e: any) => {
    if (node.current && node.current.contains(e.target as Node)) {
      // inside click
      return;
    }
    // outside click
    setIsOpen(false);
  };

  /*useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);*/

  return (
    <div className="relative">
      <Avatar
        className="cursor-pointer hover:opacity-75 active:ring-2 active:outline-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>

      {isOpen && (
        <div
          className="w-72 py-4 px-8 absolute right-0 mt-2 sm:w-96 rounded-2xl shadow-xl bg-white ring-1 ring-black ring-opacity-5"
          ref={node}
        >
          <div className="flex items-center my-4">
            <Avatar className="mr-4">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="truncate ... whitespace-nowrap font-semibold">
              {userAddress}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex w-full px-4 py-2 items-center rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                <Settings className="w-4 mr-4 opacity-70" />
                Manage account
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Account</DialogTitle>
                <DialogDescription>
                  Manage your account information
                </DialogDescription>
              </DialogHeader>
              <Separator />
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Ali" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="profile-picture" className="text-right">
                    Profile image:
                  </Label>
                  <Input
                    type="file"
                    id="rofile-picture"
                    onChange={handleImageUpload}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <button
            onClick={handleSignOut}
            className="flex w-full px-4 py-2 items-center rounded-lg text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="w-4 mr-4 opacity-70" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;

/*</Dialog>

  <button
    onClick={handleSignOut}
    className="flex w-full px-4 py-2 items-center rounded-lg text-sm text-gray-700 hover:bg-gray-100"
  >
    <LogOut className="w-4 mr-4 opacity-70" />
    Sign out
  </button>*/
