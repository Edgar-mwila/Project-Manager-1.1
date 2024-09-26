import * as React from 'react'; import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/index.ts';
import { fetchProjectById, updateProject, updateTask, updateMilestone } from '../../store/slices/projectSlice.ts';
import { Project, Task, Milestone, User, UserRole } from '../../interfaces/ProjectManager-interfaces.ts';
import Card from '../components/Card.tsx';
import Button from '../components/Button.tsx';
import Input from '../components/Input.tsx';
import ProjectAnalytics from '../components/ProjectAnalytics.tsx';
import TaskBoard from '../components/TaskBoard.tsx';
import MilestoneList from '../components/MilestonesList.tsx';
import TeamMemberList from '../components/TeamMemberList.tsx';
import DocumentList from '../components/DocumentList.tsx';
import NotificationCenter from '../components/NotificationCenter.tsx';

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
`;

const MainContent = styled.div``;

const Sidebar = styled.div``;

const ProgressBar = styled.div`
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-top: 10px;
`;

const Progress = styled.div<{ progress: number }>`
  height: 100%;
  background-color: #4caf50;
  width: ${(props) => props.progress}%;
  border-radius: 5px;
`;

const ManageTeamProject= () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const project = useSelector((state: RootState) => state.project.currentProject);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id]);

  if (!project || !currentUser) return <div>Loading...</div>;

  const isTeamLeader = currentUser.role === UserRole.Manager || currentUser.role === UserRole.Admin;

  const handleProjectUpdate = (updatedProject: Partial<Project>) => {
    dispatch(updateProject({ ...project, ...updatedProject }));
    setEditMode(false);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    dispatch(updateTask({ projectId: project.id, task: updatedTask }));
  };

  const handleMilestoneUpdate = (updatedMilestone: Milestone) => {
    dispatch(updateMilestone({ projectId: project.id, milestone: updatedMilestone }));
  };

  return (
    <ProjectContainer>
      <MainContent>
        <Card>
          <h2>{editMode ? <Input value={project.name} onChange={(e) => handleProjectUpdate({ name: e.target.value })} /> : project.name}</h2>
          <p>{editMode ? <Input value={project.description || ''} onChange={(e) => handleProjectUpdate({ description: e.target.value })} /> : project.description}</p>
          <ProgressBar>
            <Progress progress={project.progress} />
          </ProgressBar>
          {isTeamLeader && (
            <Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Save' : 'Edit'}</Button>
          )}
        </Card>
        
        <TaskBoard tasks={project.tasks} onTaskUpdate={handleTaskUpdate} userRole={currentUser.role} />
        
        <MilestoneList milestones={project.milestones} onMilestoneUpdate={handleMilestoneUpdate} userRole={currentUser.role} />
        
        {isTeamLeader && <ProjectAnalytics projectId={project.id} />}
      </MainContent>
      
      <Sidebar>
        <TeamMemberList members={project.team} userRole={currentUser.role} />
        <DocumentList projectId={project.id} userRole={currentUser.role} />
        <NotificationCenter projectId={project.id} />
      </Sidebar>
    </ProjectContainer>
  );
};

export default ManageTeamProject;