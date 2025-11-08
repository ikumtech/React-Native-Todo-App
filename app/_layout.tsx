// app/_layout.tsx
import { Slot } from 'expo-router';
import { ConvexProvider } from 'convex/react';
import { convex } from '../client'; 
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </ConvexProvider>
  );
}
