"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ethers } from "ethers";
import { useToast } from "@/components/ui/use-toast";
import { CONTRACT_ADDRESS } from "@/app/constants";
import abi from "@/public/abi.json";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";

export async function submitChallenge(key: number, flag: string, toast: any) {
  let provider = new ethers.BrowserProvider(window.ethereum);
  let user = await provider?.getSigner();
  const SignedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, user);

  try {
    const encodedFlag = ethers.keccak256(ethers.toUtf8Bytes(flag));
    let submit = await SignedContract.submitFlag(key, encodedFlag);
    toast({
      title: "Challenge submitted",
      description: "Your challenge has been submitted.",
      duration: 2000,
    });
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.revert.args[0],
      duration: 2000,
    });
    console.error(error);
  }
}

export default function Challenge({ challenge }: any) {
  const { toast } = useToast();
  const [flag, setFlag] = useState("");
  const { key, reward, name, description } = challenge || {};
  return (
    <div className="mt-5">
      <Card className="mx-auto min-w-12 h-60 w-90 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{reward}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Deploy</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Submit flag</DialogTitle>
                <DialogDescription>
                  Submit the flag for this challenge here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Flag
                  </Label>
                  <Input
                    id="flag"
                    className="col-span-3"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => submitChallenge(key, flag, toast)}
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Drawer>
            <DrawerTrigger asChild>
              <Button>Start</Button>
            </DrawerTrigger>
            

            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>{name}</DrawerTitle>
                  <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Link className="rounded border bg-blue-500 text-white px-4 py-2" href={`/challenge/${key}`}>Start</Link>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </CardFooter>
      </Card>
    </div>
  );
}
