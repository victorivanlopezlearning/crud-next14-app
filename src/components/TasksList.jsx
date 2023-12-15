'use client';

import { TaskItem } from '.';

export const TasksList = ({ tasks }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 md:mx-8 lg:mx-0 pb-10">
      {
        tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))
      }
    </div>
  )
}