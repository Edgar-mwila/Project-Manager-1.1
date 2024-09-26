// src/components/Header.tsx
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #34495e;
  color: #ecf0f1;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Header= () => {
  return (
    <HeaderContainer>
      <Logo to="/">DevTracker</Logo>
      <Nav>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/">Logout</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
