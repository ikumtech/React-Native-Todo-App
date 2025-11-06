// components/TodoInput.tsx
import React from 'react';
import styled from 'styled-components/native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

const TodoInput: React.FC<Props> = ({ value, onChangeText, onSubmit }) => {
  return (
    <InputContainer>
      <StyledInput
        placeholder="Create a new todo..."
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
      />
    </InputContainer>
  );
};

export default TodoInput;

/* Styles */
const InputContainer = styled.View`
  background-color: ${(props) => props.theme.itemBackground};
  padding: 16px 20px;
  border-radius: 6px;
  margin-bottom: 20px;
`;

const StyledInput = styled.TextInput`
  color: ${(props) => props.theme.text};
  font-size: 16px;
`;
