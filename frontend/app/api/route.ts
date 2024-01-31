import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { set_cookie } from "@/app/actions/actions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userAddress } = req.body;
    res.status(200).json({ success: true });
  } else {
    res.status(405).end(`${req.method} Method Not Allowed`);
  }
}

/*
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userAddress: userAddress }),
        };
        const response = await fetch("/api/metamask", options);
        if (response.status !== 200) throw new Error("Can't login");
        router.push("/");
      } catch (err) {
        console.log(err);
      }
*/
