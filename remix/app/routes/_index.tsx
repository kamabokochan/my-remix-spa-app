import type { MetaFunction } from "@remix-run/node";
import { useLoaderData, Form, ClientActionFunctionArgs, redirect } from '@remix-run/react'

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
  const body = await request.formData();
  const response = await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title: body.get('title')})
  })
  console.log(response)
  return redirect("/");
};

export default function Index() {
  const dataList = useLoaderData<typeof clientLoader>()
  console.log("🥲")
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Form method="post">
        <input type="text" name="title" />
        <button type="submit">追加</button>
      </Form>
      {dataList.map(data => (
        <div key={data.id}>
          <p>title: {data.title}</p>
          <p>status: {data.status}</p>
        </div>
      ))}
    </div>
  );
}
