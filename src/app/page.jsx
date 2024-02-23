"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((res) => {
        setSavedItems(res);
      });
  }, []);

  return (
    <main className="">
      <nav>
        <p>The app</p>
        <p>todo dark mode button</p>
      </nav>
      <div>
        <AddOneForm setSavedItems={setSavedItems} />
      </div>

      <div>
        {savedItems.map((i) => (
          <div key={i.id}>{i.id}</div>
        ))}
      </div>
    </main>
  );
}

export function AddOneForm({ setSavedItems }) {
  const [count, setCount] = useState(0);

  const handleIncrement = (event) => {
    event.preventDefault();
    setCount((prev) => prev + 1);
  };

  const handleDecrement = (event) => {
    event.preventDefault();
    setCount((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = JSON.stringify({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      age: data.get("age"),
      count: data.get("count"),
    });
    const response = await fetch("/api/", {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newItems = await response.json();

    setSavedItems(newItems);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <input type="text" name="count" value={count} />
      <input type="text" name="firstName" />
      <input type="text" name="lastname" />
      <input type="text" name="age" />

      <button type="submit">Add</button>
    </form>
  );
}
