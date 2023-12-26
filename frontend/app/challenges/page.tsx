import Challenge from "@/components/ui/challenge";

async function getServerSideProps() {
  "use server";
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    cache: "no-store",
  });
  const data = await res.json();
  return data as any[];
}

export default async function ChallengesPage() {
  const challenges = await getServerSideProps();
  return (
    <div>
      <h1 className="text-sky-500 text-center my-4 text-xl">Challenges</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-8">
        {challenges?.map((challenge) => {
          return <Challenge key={challenge.id} challenge={challenge} />;
        })}
      </div>
    </div>
  );
}
