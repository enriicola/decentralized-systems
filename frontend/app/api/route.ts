const API_KEY = "your_api_key_here";

type Challenge = {
  id: number;
  flag: string;
  solutions: string;
};

let challenges: Challenge[] = [
  {
    id: 0,
    flag: "FLAG{first_flag}",
    solutions: "Solution 1",
  },
  {
    id: 201,
    flag: "FLAG{this_is_the_second_flag}",
    solutions: "Solution 3",
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
