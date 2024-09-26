import * as React from 'react';
import { Milestone, UserRole } from '../../interfaces/ProjectManager-interfaces.ts';

const MilestoneList = ({ milestones, onMilestoneUpdate, userRole }: any) => {
  const handleStatusChange = (milestone: any, newStatus: string) => {
    onMilestoneUpdate({ ...milestone, status: newStatus });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">Milestones</h3>
      <ul className="space-y-4">
        {milestones.map((milestone: any) => (
          <li key={milestone.id} className="border-b pb-2">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{milestone.title}</h4>
                <p className="text-sm text-gray-600">{milestone.description}</p>
                <p className="text-sm">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                {userRole !== UserRole.Viewer && (
                  <select
                    value={milestone.status}
                    onChange={(e) => handleStatusChange(milestone, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                )}
                {userRole === UserRole.Viewer && (
                  <span className="text-sm font-medium">{milestone.status}</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MilestoneList;