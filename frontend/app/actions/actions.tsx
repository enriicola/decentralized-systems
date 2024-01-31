"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function set_cookie(userAddress: string) {
  cookies().set("userAddress", userAddress);
  redirect("/challenges");
}

export async function delete_cookie() {
  cookies().delete("userAddress");
}

/*export async function getChallenge() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com/v1/9a5f1d2a2f8e5d1f8c1f5b3c4e3a1c8b5b4b7c7a/"
  );
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = [
    "function getChallenge(uint256 challengeId) public view returns (string memory challengeName, string memory challengeDescription, string memory challengeFlag, uint256 challengePoints)",
  ];
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const challenges = [];
  for (let i = 0; i < 3; i++) {
    const challenge = await contract.getChallenge(i);
    challenges.push({
      id: i,
      name: challenge[0],
      description: challenge[1],
      flag: challenge[2],
      points: challenge[3],
    });
  }
  return challenges;
}*/
