import { FormTask } from '@/components';

export default function NewTaskPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-center mt-10">Nueva Tarea</h1>

      <FormTask />
    </div>
  )
}