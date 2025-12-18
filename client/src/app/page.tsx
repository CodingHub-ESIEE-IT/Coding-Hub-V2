import React from 'react';
import './home.css';
import Container from '@/components/layout/Container/Container';
import LandingPage from '@/components/landing/LandingPage';
import { getLatestUsers } from '@/lib/utils/api/user';

export const dynamic = 'force-dynamic';

const Home = async () => {
  let latestUsers = [];
  try {
    const response = await getLatestUsers();
    // Api fetch wrapper returns data directly if success, or might need to check structure
    // Our fetchApi in util/api.ts returns await response.json()
    // The Adonis controller returns an array of users directly or paginated object?
    // User.query().limit(10) returns array.
    // route.ts returns data directly.
    latestUsers = response || [];

    // Safety check if response is wrapped
    if (response && response.data && Array.isArray(response.data)) {
      latestUsers = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch latest users:', error);
    // Fallback to empty array or mock if needed
  }

  return (
    <Container>
      <LandingPage latestUsers={latestUsers} />
    </Container>
  );
};

export default Home;
