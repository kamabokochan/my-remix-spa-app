import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

type Todo = {
  id: number;
  title: string
  status: 'pending' | 'completed'
}

export async function clientLoader(): Promise<Todo[]> {
  const response = await fetch('http://localhost:3000/')
  const data = await response.json()
  return data
}

export default function Index() {
  const dataList = useLoaderData<typeof clientLoader>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {dataList.map(data => (
        <div key={data.id}>
          <p>{data.title}</p>
          <p>{data.status}</p>
        </div>
      ))}
    </div>
  );
}
