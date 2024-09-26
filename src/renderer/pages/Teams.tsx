// src/pages/Teams.tsx
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const TeamCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TeamLink = styled(Link)`
  text-decoration: none;
  color: #333;
`;

const Teams= () => {
  // TODO: Fetch teams from backend
  const dummyTeams = [
    { id: 1, name: 'Team Alpha', members: 5 },
    { id: 2, name: 'Team Beta', members: 3 },
    { id: 3, name: 'Team Gamma', members: 4 },
  ];

  return (
    <div>
      <h2>My Teams</h2>
      <TeamsContainer>
        {dummyTeams.map((team) => (
          <TeamCard key={team.id}>
            <TeamLink to={`/manage-team-project/${team.id}`}>
              <h3>{team.name}</h3>
              <p>Members: {team.members}</p>
            </TeamLink>
          </TeamCard>
        ))}
      </TeamsContainer>
    </div>
  );
};

export default Teams;
