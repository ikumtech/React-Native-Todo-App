// app/index.tsx
import React, { useState } from 'react';
import { FlatList, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import { useThemeContext } from '../context/ThemeContext';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const { toggleTheme, mode } = useThemeContext();

  const handleAddTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: input,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <ImageBackground
      source={
        mode === 'dark'
          ? require('../assets/dark-bg.jpg')
          : require('../assets/light-bg.jpg')
      }
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <Container>
        <HeaderRow>
          <Title>TODO</Title>
          <ThemeButton onPress={toggleTheme}>
            <ThemeIcon>{mode === 'light' ? '🌙' : '☀️'}</ThemeIcon>
          </ThemeButton>
        </HeaderRow>

        <ContentCard>
          <TodoInput
            value={input}
            onChangeText={setInput}
            onSubmit={handleAddTodo}
          />

          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoItem
                id={item.id}
                title={item.title}
                completed={item.completed}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
            ListEmptyComponent={
              <EmptyText>No todos yet. Add one!</EmptyText>
            }
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        </ContentCard>
      </Container>
    </ImageBackground>
  );
}


const Container = styled.SafeAreaView`
  flex: 1;
  padding: 24px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 8px;
`;

const ThemeButton = styled.TouchableOpacity``;

const ThemeIcon = styled.Text`
  font-size: 24px;
`;

const ContentCard = styled.View`
  background-color: ${(props) => props.theme.itemBackground};
  border-radius: 10px;
  padding: 12px;
  margin: 0 8px;
  max-width: 600px;
  align-self: center;
  width: 100%;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 4;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.textSecondary};
  padding: 20px;
`;
