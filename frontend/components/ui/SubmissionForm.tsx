"use client";
import {
  getChallengeSolution,
  checkSolutionCorrectness,
  getChallengeFlag,
} from "@/app/actions/user_actions";
import React, { useState } from "react";

export default function SubmissionForm({
  challengeKey,
  apiUrl,
}: {
  challengeKey: Number;
  apiUrl: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const [flag, setFlag] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const solution = await getChallengeSolution(challengeKey, apiUrl);
    const checkCorrect = await checkSolutionCorrectness(inputValue, solution);
    if (checkCorrect) {
      const flag = await getChallengeFlag(challengeKey, apiUrl);
      setFlag(flag);
    } else {
      setFlag("Incorrect solution!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {flag && <p>{flag}</p>}
    </>
  );
}
