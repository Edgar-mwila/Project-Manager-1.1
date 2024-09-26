import * as React from 'react'; import  { useState } from 'react';
import { Task, UserRole } from '../../interfaces/ProjectManager-interfaces.ts';

const TaskBoard = ({ tasks, onTaskUpdate, userRole }: any) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (e: any, task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  const handleDrop = (e: any, status: string) => {
    e.preventDefault();
    if (draggedTask) {
      onTaskUpdate({ draggedTask, status });
      setDraggedTask(null);
    }
  };

  const statuses = ['To Do', 'In Progress', 'Done'];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">Task Board</h3>
      <div className="grid grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div
            key={status}
            className="bg-gray-100 p-4 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h4 className="font-semibold mb-2">{status}</h4>
            {tasks
              .filter((task: { status: string; }) => task.status === status)
              .map((task: Task) => (
                <div
                  key={task.id}
                  className="bg-white p-2 mb-2 rounded shadow cursor-move"
                  draggable={userRole !== UserRole.Viewer}
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;