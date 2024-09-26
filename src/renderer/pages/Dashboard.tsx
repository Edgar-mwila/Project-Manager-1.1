// src/pages/Dashboard.tsx
import * as React from 'react'; import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ChatList from '../components/ChatList.tsx';

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1e1e1e;
  color: #fff;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const HeroSection = styled.div`
  background: linear-gradient(45deg, #00ffff, #00cccc);
  border-radius: 10px;
  padding: 40px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 255, 255, 0.3);
`;

const HeroTitle = styled.h1`
  font-size: 2.5em;
  margin-bottom: 10px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2em;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const StyledButton = styled(Link)`
  padding: 10px 20px;
  background-color: #333;
  color: #00ffff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #444;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #00ffff;
`;

const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const NewsItem = styled.div`
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const Post = styled.div`
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const NotificationsContainer = styled.div`
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
`;

const Notification = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #444;

  &:last-child {
    border-bottom: none;
  }
`;

const Sidebar = styled.aside`
  width: 300px;
  background-color: #2d2d2d;
  padding: 20px;
  overflow-y: auto;
`;

// Mock data (replace with real data fetching in a production app)
const mockNews = [
  { id: 1, title: "New JavaScript Framework Released", content: "A new framework promising 10x performance..." },
  { id: 2, title: "AI Breakthrough in Code Generation", content: "Researchers have developed an AI that can..." },
  { id: 3, title: "Major Security Vulnerability Patched", content: "A critical security flaw affecting millions..." },
];

const mockPosts = [
  { id: 1, author: "Jane Doe", content: "Just deployed my first Kubernetes cluster!" },
  { id: 2, author: "John Smith", content: "Anyone interested in a GraphQL meetup next week?" },
];

const mockNotifications = [
  { id: 1, content: "Your pull request has been approved" },
  { id: 2, content: "New comment on your Stack Overflow answer" },
  { id: 3, content: "Reminder: Team meeting in 1 hour" },
];

const Dashboard= () => {
  const [username, setUsername] = useState('Developer');

  useEffect(() => {
    // TODO: Fetch the user's name from your authentication system
    // For now, we'll use a placeholder
    setUsername('Alex');
  }, []);

  return (
    <DashboardContainer>
      <MainContent>
        <HeroSection>
          <HeroTitle>Welcome back, {username}!</HeroTitle>
          <HeroSubtitle>Ready to build something amazing today?</HeroSubtitle>
          <ButtonContainer>
            <StyledButton to="/projects">My Projects</StyledButton>
            <StyledButton to="/teams">My Teams</StyledButton>
          </ButtonContainer>
        </HeroSection>

        <SectionTitle>Tech News</SectionTitle>
        <NewsContainer>
          {mockNews.map(item => (
            <NewsItem key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </NewsItem>
          ))}
        </NewsContainer>

        <SectionTitle>Community Posts</SectionTitle>
        <PostsContainer>
          {mockPosts.map(post => (
            <Post key={post.id}>
              <strong>{post.author}</strong>: {post.content}
            </Post>
          ))}
        </PostsContainer>

        <SectionTitle>Notifications</SectionTitle>
        <NotificationsContainer>
          {mockNotifications.map(notification => (
            <Notification key={notification.id}>
              {notification.content}
            </Notification>
          ))}
        </NotificationsContainer>
      </MainContent>

      <Sidebar>
        <SectionTitle>Chats</SectionTitle>
        <ChatList />
      </Sidebar>
    </DashboardContainer>
  );
};

export default Dashboard;