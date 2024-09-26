
// src/components/Sidebar.tsx
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
`;

const SidebarLink = styled(Link)`
  display: block;
  color: #ecf0f1;
  text-decoration: none;
  padding: 10px 0;
  &:hover {
    color: #3498db;
  }
`;

const Sidebar= () => {
  return (
    <SidebarContainer>
      <h2>DevTracker</h2>
      <nav>
        <SidebarLink to="/projects">Projects</SidebarLink>
        <SidebarLink to="/teams">Teams</SidebarLink>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;