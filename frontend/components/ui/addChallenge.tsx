"use client";
import { ethers } from "ethers";
import { useUser } from "@/components/context/context";

export async function add(userAddress: string) {
  const address = "0xE62A58CB599ee66E724f84B7D0c7F3fc71eDD462";
  const abi = await (await fetch("http://localhost:3000/abi.json")).json();
  let provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(address, abi, provider);
  let user = await provider.getSigner();
  const SignedContract = new ethers.Contract(address, abi, user);

  try {
    let submit = await SignedContract.submitFlag(2, "ciao");
    const [playerAddresses, playerScores] = await contract.getScores();
    console.log("Player Addresses:", playerAddresses);
    console.log("Player Scores:", playerScores);
  } catch (error) {
    console.error(error);
  }
}

export default function AddChallenge(props: any) {
  const { userAddress, setUserAddress } = useUser();
  return (
    <div className="fixed bottom-7 right-7">
      <button
        onClick={() => add(userAddress)}
        className="p-0 w-16 h-16 bg-sky-500 rounded-full hover:bg-sky-400 active:shadow-lg shadow transition ease-in duration-200 focus:outline-none"
      >
        <svg viewBox="0 0 20 20" className="w-6 h-6 inline-block">
          <path
            fill="#FFFFFF"
            d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601 C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399 C15.952,9,16,9.447,16,10z"
          />
        </svg>
      </button>
    </div>
  );
}
