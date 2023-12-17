'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/hooks';

const initialForm = {
  name: '',
  description: '',
}

export const FormTask = ({ task = {} }) => {
  const { name, description, onInputChange, onUpdateDataForm } = useForm(initialForm);

  const router = useRouter();

  useEffect(() => {
    if (task.id) {
      onUpdateDataForm({
        name: task.name,
        description: task.description,
      })
    }
  }, [])


  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || description === '') {
      return alert('El nombre y la descripción son requeridos.');
    }

    router.refresh();

    if (task.id) {
      try {
        const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ name, description }),
        });

        if (res.ok) {
          router.push('/');
        } else {
          throw new Error('Error al actualizar la tarea.');
        }

      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await fetch('http://localhost:3000/api/tasks', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ name, description }),
        });

        if (res.ok) {
          router.push('/');
        } else {
          throw new Error('Error al crear la tarea.');
        }

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <form
      className="mx-4 md:mx-0 my-20"
      onSubmit={onSubmit}
    >
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de la tarea</label>
        <input
          type="text"
          id="name"
          name='name'
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={name}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
        <textarea
          id="description"
          name='description'
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={description}
          onChange={onInputChange}
        />
      </div>

      <div className='flex justify-between gap-4 md:gap-0'>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"
        >
          {
            task.id
              ? 'Guardar cambios'
              : 'Crear tarea'
          }

        </button>

        {
          task.id && (
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 transition-colors"
            >
              Eliminar
            </button>
          )
        }
      </div>
    </form>
  )
}