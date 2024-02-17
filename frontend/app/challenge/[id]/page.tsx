import { ethers } from "ethers";
import Loading from "@/app/challenges/loading";
import abi from "@/public/abi.json";
import { CONTRACT_ADDRESS } from "@/app/constants";
import { Suspense } from "react";
import InvisibleDiv from "@/components/ui/InvisibleDiv";
import Link from "next/link";
import InjectionForm from "@/components/ui/InjectionForm";

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://smartchallenge.vercel.app/api";

const provider = new ethers.InfuraProvider(
    process.env.ETHEREUM_NETWORK,
    process.env.INFURA_API_KEY
);

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

async function getChallengeByID(id: string) {
    const challenges = await contract.getChallenges();
    const pinata = "https://gateway.pinata.cloud/ipfs/";
    try {
        const challengeObject = await Promise.all(
            challenges.map(async (challenge: any[]) => {
                // we retrieve the challenge information by its id
                if (challenge[0].toString() === id) {
                    if (challenge[3] !== "hash") {
                        const cid = pinata + challenge[3];
                        const res = await (await fetch(cid, { cache: "no-store" })).json();
                        return {
                            key: challenge[0].toString(),
                            reward: challenge[2].toString(),
                            name: res.name,
                            description: res.description,
                        };
                    } else {
                        return {
                            key: Number(challenge[0]),
                            reward: Number(challenge[2]),
                            name: "Test Name",
                            description: "Decrypt a message encrypted with a Caesar cipher.",
                        };
                    }
                }
            })
        );
        return challengeObject.filter(Boolean) as any[];
    } catch (error) {
        console.log(error);
    }
}

function getChallengeContent(challenge: any[]) {
    let content; // Declare the 'content' variable
    const challengeKey = Number(challenge.map((c) => c.key)); // Convert the challenge key to a number
    const challengeName = challenge.map((c) => c.name).toString(); // Get the challenge name
    // NOTE: can be done also by ids but for now we will use the name
    switch (challengeName) {
        case "What\'s hidden here?": // Replace "value" with a valid case value
            // Add your code here for the valid case
            content = <InvisibleDiv challengeKey={challengeKey} apiUrl={apiUrl} />; // Set the 'content' variable to the JSX element 
            break; // Add a break statement after each case

        case "SQL injection": // Replace "value" with a valid case value
            // Add your code here for the valid case
            content = <InjectionForm challengeKey={challengeKey} apiUrl={apiUrl} />; // Set the 'content' variable to the JSX element
            break; // Add a break statement after each case

        default:
            // Add your code here for the default case
            content = <h1>Coming Soon...</h1>
            break; // Add a break statement after the default case

    }
    return content; // Return the 'content' variable
}

export default async function Challenge({ params }: { params: { id: string } }) {
    const challenge = await getChallengeByID(params.id) || []; // Provide a default value for challenge
    const content = getChallengeContent(challenge);

    return (
        <div>
            <Suspense fallback={<Loading />}>
                {challenge && (
                    <>
                        <h1 className="text-sky-500 text-center my-4 text-xl">
                            {challenge.map((c) => c.key).toString()}
                        </h1>
                        <div className="justify-center">
                            {challenge.map((c) => (
                                <div key={c.key} className="bg-white rounded-lg p-4 shadow">
                                    <h2 className="text-lg font-bold">{c.name}</h2>
                                    <p className="text-gray-500">{c.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="justify-center mt-8 mx-8">
                            {content}
                        </div>
                    </>
                )}
            </Suspense>
            <Link
                className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded fixed bottom-10 left-10"
                href={"/challenges"}
            >
                Go back to challenges
            </Link>
        </div>
    );
}