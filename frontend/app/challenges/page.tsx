import Challenge from "@/components/ui/challenge";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { useUser } from "@/components/context/context";
import { useEffect } from "react";
import { ethers } from "ethers";
import AddChallenge from "@/components/ui/addChallenge";

const provider = new ethers.InfuraProvider(
  process.env.ETHEREUM_NETWORK,
  process.env.INFURA_API_KEY
);

const address = "0x25464Ce44Ab67EB7f6954e362eF8271E4a6F5c55";
const abi = await (
  await fetch("http://localhost:3000/abi.json", { cache: "no-store" })
).json();
const contract = new ethers.Contract(address, abi, provider);

export async function getChallenge() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    cache: "no-store",
  });

  /*try {
    const [playerAddresses, playerScores] = await contract.getScores();
    console.log("Player Address:", playerAddresses[0]);
    console.log("Player Score:", playerScores[1]);
  } catch (error) {
    console.error(error);
  }*/

  const data = await res.json();
  return data as any[];
}

export default async function ChallengesPage() {
  if (!cookies().has("userAddress")) {
    redirect("/login");
  } else {
    const ownerAddress = await contract.getOwner();
    console.log("Owner Address:", ownerAddress);
    const challenges = await getChallenge();
    //const challenges = await getChallenge(contract, signedContract);
    return (
      <div>
        <h1 className="text-sky-500 text-center my-4 text-xl">Challenges</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-8">
          {challenges?.map((challenge) => {
            return <Challenge key={challenge.id} challenge={challenge} />;
          })}
        </div>
        <AddChallenge ownerAddress={ownerAddress} />
      </div>
    );
  }
}
