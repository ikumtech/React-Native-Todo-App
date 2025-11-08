// App.tsx
import React from 'react';
import { ConvexProvider } from 'convex/react';
import { convex } from './client';
import { ThemeProvider } from './context/ThemeContext';
import HomeScreen from './app/index'; 

const App = () => {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>
    </ConvexProvider>
  );
};

export default App;

**//