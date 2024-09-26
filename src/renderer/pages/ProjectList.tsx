import * as React from 'react'; import  { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '../components/Card.tsx';
import Button from '../components/Button.tsx';
import Input from '../components/Input.tsx';
import { Project } from '../../interfaces/ProjectManager-interfaces.ts';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore, auth } from '../../config/firebase.config.ts';

const ProjectListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const AddProjectButton = styled(Button)`
  margin-bottom: 20px;
`;

const ProjectCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectLink = styled(Link)`
  text-decoration: none;
  color: #333;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const ProjectList= () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const user = auth.currentUser;
      if (user) {
        const projectsRef = collection(firestore, 'projects');
        const q = query(projectsRef, where('team', 'array-contains', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedProjects: Project[] = [];
        querySnapshot.forEach((doc) => {
          fetchedProjects.push({ id: doc.id, ...doc.data() } as Project);
        });
        setProjects(fetchedProjects);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>My Projects</h2>
      <SearchContainer>
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <AddProjectButton as={Link} to="/create-project">Add New Project</AddProjectButton>
      <ProjectListContainer>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id}>
            <ProjectLink to={`/manage-project/${project.id}`}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>Progress: {project.progress}%</p>
            </ProjectLink>
          </ProjectCard>
        ))}
      </ProjectListContainer>
    </div>
  );
};

export default ProjectList;