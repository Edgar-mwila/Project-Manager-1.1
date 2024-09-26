import * as React from 'react'; import  { useState, useEffect } from 'react';

const NotificationCenter = ({ projectId }: any) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Fetch notifications for the project
    // This is a placeholder and should be replaced with actual API call
    setNotifications([
      { id: 1, message: 'New task assigned to you', timestamp: new Date() },
      { id: 2, message: 'Project deadline updated', timestamp: new Date(Date.now() - 86400000) },
      { id: 3, message: 'Comment added to your task', timestamp: new Date(Date.now() - 172800000) },
    ]);
  }, [projectId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">Notifications</h3>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li key={notification.id} className="border-b pb-2">
              <p>{notification.message}</p>
              <p className="text-sm text-gray-600">
                {notification.timestamp.toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationCenter;