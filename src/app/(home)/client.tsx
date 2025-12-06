"use client";
import React from "react";
import { trpc } from "@/trpc/client";


export default function Home() {
  const { data, isLoading, error } = trpc.categories.list.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      <h1>Categories ({data?.length ?? 0})</h1>
      <ul>
        {data?.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> — {c.description ?? "No description"}
          </li>
        ))}
      </ul>
    </main>
  );
}
