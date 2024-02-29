import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client'

const app = new Hono()
const prisma = new PrismaClient()

app.use(
  '/*',
  cors({
    origin: '*'
  })
)

// TODO全データ取得
app.get('/', async (c) => {
  const todos = await prisma.todos.findMany()

  return c.json(todos)
})

// TODO新規追加
app.post('/', async (c) => {
  const param = await c.req.json<{ title: string }>();
  const newTodo = {
    title: param.title
  }
  const createTodo = await prisma.todos.create({
    data: newTodo
  })

  return c.json(createTodo)
})

// TODOステータス更新
app.put('/:id', async (c) => {
  const id = c.req.param('id')

  const todo = await prisma.todos.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (todo === null) {
    return c.body('IDが見つかりませんでした', 404);
  }

  const updatePost = await prisma.todos.update({
    where: {
      id: parseInt(id),
    },
    data: {
      status: todo.status === "pending" ? "completed" : "pending",
    },
  });
  return c.json(updatePost);
})

// TODO削除
app.delete('/:id', async (c) => {
  const id = c.req.param('id')

  const deleteTodo = await prisma.todos.delete({
    where: {
      id: parseInt(id),
    },
  });

  return c.json(deleteTodo);
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
