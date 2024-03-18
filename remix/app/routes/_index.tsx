import type { MetaFunction } from "@remix-run/node";
import { useLoaderData, Form, ClientActionFunctionArgs, redirect, useFetcher } from '@remix-run/react'
import { FormEvent } from "react";

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

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const baseUrl = 'http://localhost:3000/'
  const formData = await request.formData()
  if (request.method === 'PUT') {
    const id = await formData.get('id');
    await fetch(`${baseUrl}${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
    })
  } else {
    await fetch(baseUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title: formData.get('title')})
    })
  }
  return redirect("/");
}

export default function Index() {
  const dataList = useLoaderData<typeof clientLoader>()
  const fetcher = useFetcher()

  const updateStatus = (event: FormEvent<HTMLFormElement>, id: number) => {
    fetcher.submit(
      { id },
      { method: 'PUT' }
    )
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Form method="post">
        <input type="text" name="title" />
        <button type="submit">追加</button>
      </Form>
      {dataList.map(data => (
        <div key={data.id}>
          {<fetcher.Form onChange={(event) => updateStatus(event, data.id)}>
            <input type="checkbox" name="status" id="" checked={data.status === "completed"} />
          </fetcher.Form>}
          <p>title: {data.title}</p>
          <p>status: {data.status}</p>
        </div>
      ))}
    </div>
  );
}
