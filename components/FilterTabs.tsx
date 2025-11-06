import React from 'react';
import styled from 'styled-components/native';

interface Props {
  currentFilter: string;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

export default function FilterTabs({ currentFilter, setFilter }: Props) {
  return (
    <TabsWrapper>
      <TabButton
        active={currentFilter === 'all'}
        onPress={() => setFilter('all')}
      >
        <TabText active={currentFilter === 'all'}>All</TabText>
      </TabButton>
      <TabButton
        active={currentFilter === 'active'}
        onPress={() => setFilter('active')}
      >
        <TabText active={currentFilter === 'active'}>Active</TabText>
      </TabButton>
      <TabButton
        active={currentFilter === 'completed'}
        onPress={() => setFilter('completed')}
      >
        <TabText active={currentFilter === 'completed'}>Completed</TabText>
      </TabButton>
    </TabsWrapper>
  );
}

const TabsWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  padding: 16px 0;
`;

const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 4px 8px;
`;

const TabText = styled.Text<{ active: boolean }>`
  color: ${(props) =>
    props.active
      ? props.theme.primaryText || '#4a5cff'
      : props.theme.textSecondary || '#aaa'};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  font-size: 16px;
`;
