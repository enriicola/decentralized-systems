'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";

import axios from "axios";

async function getChallengeFlag(id: Number, apiUrl: string) {
    try {
        const response = await axios.get(
            apiUrl,
            {
                params: {
                    id: Number(id),
                },
                headers: {
                    "api-key": "your_api_key_here",
                },
            }
        );
        return response.data.flag;
    } catch (error) {
        console.error(error);
    }
}

export default function InvisibleDiv({ challengeKey, apiUrl }: { challengeKey: Number, apiUrl: string }) {
    const [flag, setFlag] = React.useState<string | null>(null);

    const handleClick = async () => {
        const flag = await getChallengeFlag(challengeKey, apiUrl);
        setFlag(flag);
    };

    return (
        <div className="invisible">
            <Button variant="ghost" onClick={handleClick}>
                Obtain The Flag
            </Button>
            {flag && <p>{flag}</p>}
        </div>
    );
}