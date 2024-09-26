import * as React from 'react'; import  { useEffect, useState } from 'react';
import styled from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase.config.ts';
import { Project, ProjectAnalytics as ProjectAnalyticsType } from '../../interfaces/ProjectManager-interfaces.ts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-top: 20px;
`;

const ProjectAnalytics = (projectId: any) => {
  const [analytics, setAnalytics] = useState<ProjectAnalyticsType | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (projectId) {
        const docRef = doc(firestore, 'projects', projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAnalytics(docSnap.data().analytics as ProjectAnalyticsType);
        }
      }
    };

    fetchAnalytics();
  }, [projectId]);

  if (!analytics) {
    return <div>Loading analytics...</div>;
  }

  return (
    <AnalyticsContainer>
      <h3>Project Analytics</h3>
      <p>Total Tasks: {analytics.totalTasks}</p>
      <p>Completed Tasks: {analytics.completedTasks}</p>
      <p>Total Hours Logged: {analytics.totalHoursLogged}</p>
      <p>Upcoming Deadlines: {analytics.upcomingDeadlines}</p>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analytics.burndownChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="remainingWork" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </AnalyticsContainer>
  );
};

export default ProjectAnalytics;
