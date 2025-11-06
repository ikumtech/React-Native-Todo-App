import { Slot } from 'expo-router';
import { ConvexProvider } from 'convex/react';
import convex from '../client'; // ✅ points to /client.ts
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
