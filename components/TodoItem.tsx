// components/TodoItem.tsx
import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

interface Props {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ id, title, completed, onToggle, onDelete }) => {
  return (
    <ItemContainer>
      <TouchableOpacity onPress={() => onToggle(id)}>
        <Checkbox completed={completed}>
          {completed && <CheckMark>✓</CheckMark>}
        </Checkbox>
      </TouchableOpacity>

      <ItemText completed={completed}>{title}</ItemText>

      <TouchableOpacity onPress={() => onDelete(id)}>
        <DeleteText>✕</DeleteText>
      </TouchableOpacity>
    </ItemContainer>
  );
};

export default TodoItem;

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.textSecondary};
`;

const Checkbox = styled.View<{ completed: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 2px solid ${(props) => props.theme.primary};
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.completed ? props.theme.primary : 'transparent'};
  margin-right: 16px;
`;

const CheckMark = styled.Text`
  color: white;
  font-size: 16px;
`;

const ItemText = styled.Text<{ completed: boolean }>`
  flex: 1;
  font-size: 16px;
  color: ${(props) =>
    props.completed ? props.theme.textSecondary : props.theme.text};
  text-decoration-line: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const DeleteText = styled.Text`
  color: red;
  font-size: 16px;
  padding-left: 12px;
`;
