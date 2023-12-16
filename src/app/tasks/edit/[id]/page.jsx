import { FormTask } from "@/components";
import { redirect } from "next/navigation";

async function getTask(id) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
  return await res.json();
}

export default async function EditTaskPage({ params: { id } }) {

  const task = await getTask(id);

  if (task.error) redirect('/');

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-center mt-10">Editando: {task.name}</h1>

      <FormTask />
    </div>
  )
}