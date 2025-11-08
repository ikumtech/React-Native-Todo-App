import React, { useState } from 'react';
import styled from 'styled-components/native';

interface Props {
  currentFilter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const filters: Array<'all' | 'active' | 'completed'> = ['all', 'active', 'completed'];

const FilterTabs: React.FC<Props> = ({ currentFilter, setFilter }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <FilterTabsContainer>
      {filters.map((filter) => (
        <FilterButton
          key={filter}
          onPress={() => setFilter(filter)}
          onHoverIn={() => setHovered(filter)}
          onHoverOut={() => setHovered(null)}
        >
          <FilterText
            isActive={currentFilter === filter}
            isHovered={hovered === filter}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </FilterText>
        </FilterButton>
      ))}
    </FilterTabsContainer>
  );
};

export default FilterTabs;

// STYLES
const FilterTabsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 16px;
`;

const FilterButton = styled.Pressable``;

const FilterText = styled.Text<{ isActive: boolean; isHovered: boolean }>`
  font-size: 14px;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  color: ${({ isActive, isHovered }) =>
    isActive || isHovered ? '#4F46E5' : '#999'};
`;
