"use client";

import { trpc } from "@/trpc/client";

export default function Home() {
  const { data }  = trpc.hello.useQuery({ text: 'from tRPC' });
  return (
    <div >
      Client Component says : <span className="text-blue-400">{data?.greeting}</span>
    </div>
  );
}
