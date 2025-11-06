import React, { useState } from 'react';
import { ScrollView, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { useThemeContext } from '../context/ThemeContext';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import FilterTabs from '../components/FilterTabs';




export default function HomeScreen() {
  const { toggleTheme, mode } = useThemeContext();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  return (
    <ScrollView style={{ flex: 1 }}>
      <ImageHeader
        source={
          mode === 'dark'
            ? require('../assets/dark-bg.jpg')
            : require('../assets/light-bg.jpg')
        }
        resizeMode="cover"
      >
        <MaxWidthWrapper>
          <HeaderRow>
            <Title>TODO</Title>
            <ThemeButton onPress={toggleTheme}>
              <ThemeIcon>{mode === 'light' ? '🌙' : '☀️'}</ThemeIcon>
            </ThemeButton>
          </HeaderRow>
          
          <TodoInput />
        </MaxWidthWrapper>
      </ImageHeader>

      <ThemeSection>
        <MaxWidthWrapper>
          <ContentCard>
            <TodoList filter={filter} />
            <FooterRow>
              <FilterTabs currentFilter={filter} setFilter={setFilter} />
              <HintText>Drag and drop to reorder list</HintText>
            </FooterRow>
          </ContentCard>
        </MaxWidthWrapper>
      </ThemeSection>
    </ScrollView>
  );
}

const ImageHeader = styled.ImageBackground`
  padding-top: 60px;
  padding-bottom: 24px;
  padding-horizontal: 24px;
`;

const ThemeSection = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: 24px 16px 60px;
`;

const MaxWidthWrapper = styled.View`
  width: 100%;
  max-width: 600px;
  align-self: center;
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
  margin-top: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 4;
`;

const FooterRow = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const HintText = styled.Text`
  color: ${(props) => props.theme.textSecondary};
  margin-top: 12px;
  font-size: 13px;
`;
