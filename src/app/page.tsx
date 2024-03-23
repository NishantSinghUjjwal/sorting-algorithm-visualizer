import Image from "next/image";
import Range from "./ui/Range";
import Graph from "./ui/Graph";

export default function Home({ params, searchParams }: { params: {}, searchParams: { range: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Range />
      <Graph range={searchParams?.range? parseInt(searchParams.range):2} />
    </main>
  );
}
