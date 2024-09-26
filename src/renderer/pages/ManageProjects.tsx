// src/pages/ManageProject.tsx
import * as React from 'react';
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card.tsx';
import Button from '../components/Button.tsx';
import Input from '../components/Input.tsx';
import { Project, Task, Milestone, User } from '../../interfaces/ProjectManager-interfaces.ts';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase.config.ts';
import { TaskStatus } from '../../interfaces/ProjectManager-interfaces.ts';

// Styled components
const ProjectContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ProgressContainer = styled.div`
  margin-top: 20px;
`;

const ProgressBar = styled.div`
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
`;

const Progress = styled.div<{ progress: number }>`
  height: 100%;
  background-color: #4caf50;
  width: ${(props) => props.progress}%;
`;

const MilestoneSection = styled.div`
  margin-top: 40px;
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 8px;
`;

const MilestoneTitle = styled.h4`
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? '#4caf50' : '#f0f0f0')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: none;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const ManageProject= () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        const projectRef = doc(firestore, 'projects', id);
        const projectSnap = await getDoc(projectRef);
        if (projectSnap.exists()) {
          setProject({ id: projectSnap.id, ...projectSnap.data() } as Project);
        }
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    if (project) {
      const updatedTasks = project.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      );
      await updateDoc(doc(firestore, 'projects', project.id), { tasks: updatedTasks });
      setProject({ ...project, tasks: updatedTasks });
    }
  };

  const renderOverview = () => (
    <>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <ProgressContainer>
        <h4>Project Progress</h4>
        <ProgressBar>
          <Progress progress={project.progress} />
        </ProgressBar>
      </ProgressContainer>
      <div>
        <h4>Team Members</h4>
        <ul>
          {project.team.map((member: User) => (
            <li key={member.id}>{member.name} - {member.role}</li>
          ))}
        </ul>
      </div>
    </>
  );

  const renderTasks = () => (
    <>
      <h3>Tasks</h3>
      <TaskList>
        {project.tasks.map((task) => (
          <TaskItem key={task.id}>
            <span>{task.title}</span>
            <span>{task.status}</span>
            <TaskActions>
              <Button onClick={() => updateTask(task.id, { status: TaskStatus.InProgress })}>Start</Button>
              <Button onClick={() => updateTask(task.id, { status: TaskStatus.Done })}>Complete</Button>
              <Button as={Link} to={`/edit-task/${task.id}`}>Edit</Button>
            </TaskActions>
          </TaskItem>
        ))}
      </TaskList>
      <Button as={Link} to={`/add-task/${project.id}`}>Add New Task</Button>
    </>
  );

  const renderMilestones = () => (
    <MilestoneSection>
      <MilestoneTitle>Milestones</MilestoneTitle>
      <ul>
        {project.milestones.map((milestone: Milestone) => (
          <li key={milestone.id}>
            {milestone.title} - Due by {milestone.dueDate.toDate().toLocaleDateString()}
            <ProgressBar>
              <Progress progress={milestone.progress} />
            </ProgressBar>
          </li>
        ))}
      </ul>
      <Button as={Link} to={`/add-milestone/${project.id}`}>Add Milestone</Button>
    </MilestoneSection>
  );

  return (
    <Card>
      <TabContainer>
        <Tab active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview</Tab>
        <Tab active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')}>Tasks</Tab>
        <Tab active={activeTab === 'milestones'} onClick={() => setActiveTab('milestones')}>Milestones</Tab>
      </TabContainer>
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'tasks' && renderTasks()}
      {activeTab === 'milestones' && renderMilestones()}
    </Card>
  );
};

export default ManageProject