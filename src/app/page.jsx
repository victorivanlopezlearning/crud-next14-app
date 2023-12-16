import Link from 'next/link';
import { TasksList } from '@/components';

async function getTasks() {
  try {
    const res = await fetch('http://localhost:3000/api/tasks', {
      cache: 'no-store'
    });

    if (!res.ok) throw new Error('Hubo un error al obtener las tareas.');

    return res.json();
  } catch (error) {
    console.log('Error al cargar las tareas: ', error);
  }
}

export default async function HomePage() {

  const tasks = await getTasks();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mt-10">Listado de tareas</h1>

      <div className='flex justify-end my-10 mx-4 md:mx-8 lg:mx-0'>
        <Link
          href="/tasks/new"
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full md:w-auto text-center'
        >
          Crear nueva tarea
        </Link>
      </div>

      {
        tasks.length === 0
          ? <p>No hay tareas aún.</p>
          : <TasksList tasks={tasks} />
      }
    </div>
  )
}