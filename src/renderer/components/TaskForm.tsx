import * as React from 'react'; import  { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Task, TaskPriority, TaskStatus, User } from '../../interfaces/ProjectManager-interfaces.ts';
import { updateProject, updateTask } from '../../store/slices/projectSlice.ts';
import Input from './Input.tsx';
import Button from './Button.tsx';
import Select from './Select.tsx';
import { AppDispatch } from '../../store/index.ts';
import { Timestamp } from 'firebase/firestore';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

interface TaskFormProps {
  task?: Task;
  projectId: string;
  onSubmit: () => void;
}

const TaskForm = ({ task, projectId, onSubmit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [assignee, setAssignee] = useState<string>(task?.assignee.id || '');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || TaskPriority.Medium);
  const [status, setStatus] = useState<TaskStatus>(task?.status || TaskStatus.Todo);
  const [estimatedTime, setEstimatedTime] = useState(task?.estimatedTime?.toString() || '');

  // Assume we have a list of team members
  const teamMembers: User[] = []; // This should be populated from your state or props

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedTask: Task = {
      id: task?.id || Date.now().toString(),
      title,
      description,
      assignee: teamMembers.find(member => member.id === assignee) as User,
      dueDate: task?.dueDate || new Date() as unknown as Timestamp,
      priority,
      status,
      estimatedTime: parseFloat(estimatedTime),
      // Other fields should be added here
    };

    // Dispatch action to update project with new/updated task
    dispatch(updateTask({ projectId: projectId, task: updatedTask }));
    onSubmit();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <Input
        as="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <Select
        value={assignee}
        onChange={(e: { target: { value: any }; }) => setAssignee(e.target.value)}
        required
      >
        <option value="">Select Assignee</option>
        {teamMembers.map((member) => (
          <option key={member.id} value={member.id}>{member.name}</option>
        ))}
      </Select>
      <Select
        value={priority}
        onChange={(e: { target: { value: any; }; }) => setPriority(e.target.value as TaskPriority)}
        required
      >
        {Object.values(TaskPriority).map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </Select>
      <Select
        value={status}
        onChange={(e: { target: { value: any; }; }) => setStatus(e.target.value as TaskStatus)}
        required
      >
        {Object.values(TaskStatus).map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </Select>
      <Input
        type="number"
        value={estimatedTime}
        onChange={(e) => setEstimatedTime(e.target.value)}
        placeholder="Estimated Time (hours)"
      />
      <Button type="submit">{task ? 'Update Task' : 'Create Task'}</Button>
    </FormContainer>
  );
};

export default TaskForm;