"use client";
import Link from "next/link";
import Image from "next/image";
import sc from "@/public/smart.png";
import React, { useState } from "react";
// <Link className={buttonVariants({ variant: "outline" })} href="/">
// import { buttonVariants } from "@/components/ui/button";

type Link = {
  name: string;
  href: string;
};

export default function Nav() {
  const [activeLink, setActiveLink] = useState("Home");

  const links: Link[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Challenges",
      href: "/challenges",
    },
    {
      name: "Leaderboard",
      href: "/",
    },
  ];

  return (
    <nav className="flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-10">
      <Link className="flex items-center ml-4" href="/">
        <Image src={sc} alt="Picture" width={70} height={70} />
        <h2 className="text-xl logo">SmartChallenge</h2>
      </Link>
      <div className="mr-4">
        {links.map((link: Link, index: number) => (
          <Link
            key={index}
            href={`${link.href}`}
            onClick={() => setActiveLink(link.name)}
            className={`${
              activeLink === link.name
                ? "text-2xl font-medium"
                : "text-base font-light hover:text-xl"
            } mx-4`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
