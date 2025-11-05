// App.tsx
import { ThemeProvider } from './context/ThemeContext';
import { Slot } from 'expo-router';
import styled from 'styled-components/native'; // ✅ not just styled-components


export default function App() {
  return (
    <ThemeProvider> {/* ✅ Wrap all content with ThemeProvider */}
      <Slot />
    </ThemeProvider>
  );
}
