import React from 'react';
import { FlatList } from 'react-native';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import TodoItem from './TodoItem';
import styled from 'styled-components/native';
import FilterTabs from './FilterTabs';

interface Props {
  filter: 'all' | 'active' | 'completed';
  setFilter?: (filter: 'all' | 'active' | 'completed') => void;
}

export default function TodoList({ filter, setFilter }: Props) {
  const todos = useQuery(api.functions.getTodos);
  const clearCompleted = useMutation(api.functions.clearCompletedTodos);

  if (todos === undefined) {
    return <CenteredText>Loading todos...</CenteredText>;
  }

  const filtered = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <>
      {filtered.length === 0 ? (
        <CenteredText>No todos match this filter!</CenteredText>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TodoItem todo={item} />}
        />
      )}

      {/* Bottom Controls Row */}
      <BottomRow>
        <ItemsLeftText>
          {itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left
        </ItemsLeftText>

        {setFilter && (
          <FiltersWrapper>
            <FilterTabs currentFilter={filter} setFilter={setFilter} />
          </FiltersWrapper>
        )}

        <ClearButton onPress={() => clearCompleted()}>
          <ClearButtonText>Clear Completed</ClearButtonText>
        </ClearButton>
      </BottomRow>
    </>
  );
}

/* --- Styled Components --- */

const CenteredText = styled.Text`
  text-align: center;
  padding: 20px;
  color: ${(props) => props.theme.textSecondary};
`;

const BottomRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  gap: 8px;
  flex-wrap: wrap;
`;

const ItemsLeftText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.textSecondary};
  flex: 1;
`;

const FiltersWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

const ClearButton = styled.Pressable`
  flex: 1;
  align-items: flex-end;
`;

const ClearButtonText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.2s ease;

  /* Hover style for web */
  ${ClearButton}:hover & {
    color: #4f46e5;
  }
`;
