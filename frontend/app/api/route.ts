const API_KEY = "your_api_key_here";

type Challenge = {
  id: number;
  flag: string;
  solution: string;
};

let challenges: Challenge[] = [
  {
    id: 0,
    flag: "FLAG{first_flag}",
    solution: "Solution 1",
  },
  {
    id: 1,
    flag: "FLAG{second_flag}",
    solution: "another solution",
  },
  {
    id: 2,
    flag: "FLAG{second_flag}",
    solution: "'OR 1=1 --",
  },
];

export async function GET(req: Request) {
  const apiKey = req.headers.get("api-key");
  if (apiKey !== API_KEY) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json(challenges);
  return Response.json(
    challenges.find((challenge) => challenge.id === Number(id))
  );
}

export async function POST(req: Request) {
  const apiKey = req.headers.get("api-key");
  if (apiKey !== API_KEY) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const newChallenge: Challenge = await new Response(req.body).json();
  const existingChallenge = challenges.find(
    (challenge) => challenge.id === newChallenge.id
  );
  if (existingChallenge) {
    return Response.json("A challenge with this ID already exists");
  } else {
    challenges.push(newChallenge);
    return Response.json("Challenge added successfully");
  }
}
