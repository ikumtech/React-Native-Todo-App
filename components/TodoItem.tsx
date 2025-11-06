// components/TodoItem.tsx
import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

interface Props {
  todo: {
    _id: string;
    title: string;
    completed: boolean;
  };
  onLongPress?: () => void; // needed for drag-and-drop
}

export default function TodoItem({ todo, onLongPress }: Props) {
  const toggle = useMutation(api.functions.toggleTodo);
  const remove = useMutation(api.functions.deleteTodo);

  const handleToggle = () => {
    toggle({ id: todo._id, completed: !todo.completed });
  };

  const handleDelete = () => {
    remove({ id: todo._id });
  };

  return (
    <Row onLongPress={onLongPress}>
      <LeftSection onPress={handleToggle}>
        <Checkbox completed={todo.completed}>
          {todo.completed && <Checkmark>✓</Checkmark>}
        </Checkbox>

        <Title completed={todo.completed}>{todo.title}</Title>
      </LeftSection>

      <DeleteButton onPress={handleDelete}>
        <DeleteText>×</DeleteText>
      </DeleteButton>
    </Row>
  );
}

/* --- Styles --- */

const Row = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px;
  background-color: ${(props) => props.theme.itemBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.border || '#333'};
`;

const LeftSection = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Checkbox = styled.View<{ completed: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${(props) =>
    props.completed ? props.theme.primary : props.theme.textSecondary};
  background-color: ${(props) =>
    props.completed ? props.theme.primary : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-right: 14px;
`;

const Checkmark = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const Title = styled.Text<{ completed: boolean }>`
  color: ${(props) => props.theme.text};
  font-size: 16px;
  text-decoration-line: ${(props) => (props.completed ? 'line-through' : 'none')};
  opacity: ${(props) => (props.completed ? 0.5 : 1)};
`;

const DeleteButton = styled.TouchableOpacity`
  padding: 8px;
`;

const DeleteText = styled.Text`
  color: ${(props) => props.theme.textSecondary};
  font-size: 20px;
`;
