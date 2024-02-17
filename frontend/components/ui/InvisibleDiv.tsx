"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

import { getChallengeFlag } from "@/app/actions/user_actions";

export default function InvisibleDiv({
  challengeKey,
  apiUrl,
}: {
  challengeKey: Number;
  apiUrl: string;
}) {
  const [flag, setFlag] = React.useState<string | null>(null);

  const handleClick = async () => {
    const flag = await getChallengeFlag(challengeKey, apiUrl);
    setFlag(flag);
  };

  return (
    <div className="invisible flex mt-8 mx-8 items-center justify-center">
      <Button variant="ghost" onClick={handleClick}>
        Obtain The Flag
      </Button>
      {flag && <p>{flag}</p>}
    </div>
  );
}
