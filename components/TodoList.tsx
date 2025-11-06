import React from "react";
import styled from "styled-components/native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import TodoItem from "./TodoItem";

interface Props {
  filter: "all" | "active" | "completed";
}

export default function TodoList({ filter }: Props) {
  const todos = useQuery(api.functions.getTodos);
  const reorder = useMutation(api.functions.reorderTodos);

  if (todos === undefined) {
    return <CenteredText>Loading todos...</CenteredText>;
  }

  // Filter logic remains the same ✅
  const filtered = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (filtered.length === 0) {
    return <CenteredText>No todos match this filter!</CenteredText>;
  }

  const renderItem = ({ item, drag }: RenderItemParams<typeof filtered[0]>) => (
    <TodoItem todo={item} onLongPress={drag} />
  );

  return (
    <DraggableFlatList
      data={filtered}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      onDragEnd={({ data }) => {
        const orderedIds = data.map((todo) => todo._id);
        reorder({ orderedIds });
      }}
      contentContainerStyle={{ paddingBottom: 12 }}
    />
  );
}

const CenteredText = styled.Text`
  text-align: center;
  padding: 20px;
  color: ${(props) => props.theme.textSecondary};
`;
