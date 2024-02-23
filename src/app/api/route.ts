const list: any[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 25,
    count: 2,
  },
];

export async function GET() {
  return Response.json(list);
}

export async function POST(request: Request) {
  const data = await request.json();
  if (!data.firstName || !data.lastName || !data.age || !data.count)
    return Response.json({ error: "Invalid data" }, { status: 400 });

  if (isNaN(parseInt(data.age)) || isNaN(parseInt(data.count)))
    return Response.json({ error: "Invalid data" }, { status: 400 });

  const id = list.length + 1;
  const newItem = { id, ...data };
  list.push(newItem);
  return Response.json(list);
}
