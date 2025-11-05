import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <IconWrapper>
        <Ionicons
          name={theme === 'dark' ? 'sunny' : 'moon'}
          size={24}
          color={theme === 'dark' ? '#FFD700' : '#333'}
        />
      </IconWrapper>
    </TouchableOpacity>
  );
};

const IconWrapper = styled.View`
  padding: 8px;
`;

export default ThemeToggle;
