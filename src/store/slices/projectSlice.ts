import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Project, Task, Milestone } from '../../interfaces/ProjectManager-interfaces.ts';
import { collection, getDocs, doc, getDoc, updateDoc, addDoc, Timestamp } from 'firebase/firestore';
import { firestore } from '../../config/firebase.config.ts';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async () => {
    const querySnapshot = await getDocs(collection(firestore, 'projects'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  }
);

export const fetchProjectById = createAsyncThunk(
  'project/fetchProjectById',
  async (projectId: string) => {
    const docRef = doc(firestore, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    }
    throw new Error('Project not found');
  }
);

export const addProject = createAsyncThunk(
  'project/addProject',
  async (project: Omit<Project, 'id'>) => {
    const docRef = await addDoc(collection(firestore, 'projects'), {
      ...project,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { id: docRef.id, ...project } as Project;
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async (project: Project) => {
    const { id, ...projectData } = project;
    await updateDoc(doc(firestore, 'projects', id), {
      ...projectData,
      updatedAt: Timestamp.now(),
    });
    return project;
  }
);

export const updateTask = createAsyncThunk(
  'project/updateTask',
  async ({ projectId, task }: { projectId: string; task: Task }) => {
    const projectRef = doc(firestore, 'projects', projectId);
    const projectSnap = await getDoc(projectRef);
    if (projectSnap.exists()) {
      const updatedTasks = projectSnap.data().tasks.map((t: Task) =>
        t.id === task.id ? task : t
      );
      await updateDoc(projectRef, { tasks: updatedTasks });
      return { id: projectSnap.id, tasks: updatedTasks } as Project;
    }
    throw new Error('Project not found');
  }
);

export const updateMilestone = createAsyncThunk(
  'project/updateMilestone',
  async ({ projectId, milestone }: { projectId: string; milestone: Milestone }) => {
    const projectRef = doc(firestore, 'projects', projectId);
    const projectSnap = await getDoc(projectRef);
    if (projectSnap.exists()) {
      const updatedMilestones = projectSnap.data().milestones.map((m: Milestone) =>
        m.id === milestone.id ? milestone : m
      );
      await updateDoc(projectRef, { milestones: updatedMilestones });
      return { id: projectSnap.id, milestones: updatedMilestones } as Project;
    }
    throw new Error('Project not found');
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.currentProject = action.payload;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.currentProject = action.payload;
        state.projects = state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(updateMilestone.fulfilled, (state, action) => {
        state.currentProject = action.payload;
        state.projects = state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      });
  },
});

export default projectSlice.reducer;