import * as React from 'react'; import  { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Milestone } from '../../interfaces/ProjectManager-interfaces.ts';
import { updateMilestone, updateProject } from '../../store/slices/projectSlice.ts';
import Input from './Input.tsx';
import Button from './Button.tsx';
import { AppDispatch } from '../../store/index.ts';
import { Timestamp } from 'firebase/firestore';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

interface MilestoneFormProps {
  milestone?: Milestone;
  projectId: string;
  onSubmit: () => void;
}

const MilestoneForm = ({ milestone, projectId, onSubmit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState(milestone?.title || '');
  const [description, setDescription] = useState(milestone?.description || '');
  const [dueDate, setDueDate] = useState(milestone?.dueDate.toDate().toISOString().split('T')[0] || '');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedMilestone: Milestone = {
      id: milestone?.id || Date.now().toString(),
      title,
      description,
      dueDate: new Date(dueDate) as unknown as Timestamp,
      tasks: milestone?.tasks || [],
      progress: milestone?.progress || 0,
    };

    // Dispatch action to update project with new/updated milestone
    await dispatch(updateMilestone({ projectId: projectId, milestone: updatedMilestone }));
    onSubmit();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Milestone Title"
        required
      />
      <Input
        as="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Milestone Description"
      />
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <Button type="submit">{milestone ? 'Update Milestone' : 'Create Milestone'}</Button>
    </FormContainer>
  );
};

export default MilestoneForm;