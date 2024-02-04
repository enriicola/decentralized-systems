"use client";
import { ethers } from "ethers";
import { useUser } from "@/components/context/context";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export async function add(
  name: string,
  description: string,
  flag: string,
  reward: number,
  category: string
) {
  const address = "0x25464Ce44Ab67EB7f6954e362eF8271E4a6F5c55";
  const abi = await (
    await fetch("http://localhost:3000/abi.json", { cache: "no-store" })
  ).json();

  let provider = new ethers.BrowserProvider(window.ethereum);
  //const contract = new ethers.Contract(address, abi, provider);
  let user = await provider?.getSigner();
  const SignedContract = new ethers.Contract(address, abi, user);

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxY2ZhYTlkYS0wMzkxLTRkODAtYTk2YS05NjllNmUxZDI2MWMiLCJlbWFpbCI6ImFsaS5oYWlkZXIuaWljMDBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImUyZTRlODYyYTJlOTdlYWRlZjkwIiwic2NvcGVkS2V5U2VjcmV0IjoiYTZlZmI4MTZmNGZiMzI0MGQ2OGZiNTlhOTA5NjMzOTkzZDU2YTJhMGU0NjQwOTQxMmVlZDc4ZWQ0NzNmODA5NiIsImlhdCI6MTcwNzA3MjA4NH0.355NkcXe1T1Zr1YQYLTYS-yUyrcQ-8aC-oiSNL_XlYk",
    },
    body: JSON.stringify({
      pinataContent: {
        name: name,
        description: description,
        category: category,
      },
      pinataOptions: { cidVersion: 1 },
      pinataMetadata: { name: "pinnie.json" },
    }),
  };

  const response = await (
    await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", options)
  ).json();

  /*.then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));*/

  console.log(response.IpfsHash);

  try {
    let add = await SignedContract.addChallenge(
      flag,
      reward,
      response.IpfsHash
    );
    console.log(add);
  } catch (error) {
    console.error(error);
  }
}

export default function AddChallenge() {
  const { userAddress, setUserAddress } = useUser();
  const [flag, setFlag] = useState("");
  const [reward, setReward] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  //console.log("User Address:", userAddress);

  return (
    <div>
      <div className="fixed bottom-7 right-7">
        <Dialog>
          <DialogTrigger asChild>
            <button className="p-0 w-16 h-16 bg-sky-500 rounded-full hover:bg-sky-400 active:shadow-lg shadow transition ease-in duration-200 focus:outline-none">
              <svg viewBox="0 0 20 20" className="w-6 h-6 inline-block">
                <path
                  fill="#FFFFFF"
                  d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601 C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399 C15.952,9,16,9.447,16,10z"
                />
              </svg>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add Challenge</DialogTitle>
              <DialogDescription>
                Add a new challenge to the platform
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  className="col-span-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  className="col-span-3"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="flag" className="text-right">
                  Flag
                </Label>
                <Input
                  id="flag"
                  className="col-span-3"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reward" className="text-right">
                  Reward
                </Label>
                <Input
                  id="reward"
                  className="col-span-3"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => add(name, description, flag, +reward, category)}
                type="submit"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
