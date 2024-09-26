import * as React from 'react';
import { User, UserRole } from '../../interfaces/ProjectManager-interfaces.ts';

const TeamMemberList = ({ members, userRole }: any) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">Team Members</h3>
      <ul className="space-y-2">
        {members.map((member: any) => (
          <li key={member.id} className="flex items-center space-x-2">
            <img
              src={member.avatar || '/api/placeholder/32/32'}
              alt={member.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
            {userRole === UserRole.Manager && (
              <button className="ml-auto text-sm text-blue-600 hover:text-blue-800">
                Manage
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMemberList;