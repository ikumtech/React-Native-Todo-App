import React, { useState } from 'react';
import { ScrollView, ImageBackground, useWindowDimensions, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useThemeContext } from '../context/ThemeContext';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import FilterTabs from '../components/FilterTabs';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api'; 

export default function HomeScreen() {
  const { toggleTheme, mode } = useThemeContext();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [input, setInput] = useState('');

  const createTodo = useMutation(api.functions.createTodo); //  Convex function

  const handleAddTodo = async () => {
  if (input.trim() === '') return;
  try {
    await createTodo({ title: input.trim(), description: '' });
    setInput('');
  } catch (err) {
    console.error('Failed to add todo:', err);
  }
};


  const { width } = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageHeader
          source={
            mode === 'dark'
              ? require('../assets/dark-bg.jpg')
              : require('../assets/light-bg.jpg')
          }
          resizeMode="cover"
        >
          <HeaderContent style={{ paddingHorizontal: 24, width: '100%' }}>
            <MaxWidthWrapper>
                <HeaderRow>
                  <Title>TODO </Title>
                  <ThemeButton onPress={toggleTheme}>
                    <ThemeIcon>{mode === 'light' ? '🌙' : '☀️'}</ThemeIcon>
                  </ThemeButton>
                </HeaderRow>

                <InputSpacer>
                  <TodoInput
                    value={input}
                    onChangeText={setInput}
                    onSubmit={handleAddTodo}
                  />
                </InputSpacer>
              </MaxWidthWrapper>
          </HeaderContent>
        </ImageHeader>

        <ThemeSection>
          <MaxWidthWrapper>
            <ContentCard style={{ marginTop: -40 }}>
              <TodoList filter={filter} />

              <FooterRow>
                <FilterTabs currentFilter={filter} setFilter={setFilter} />
                <HintText>Drag and drop to reorder list</HintText>
              </FooterRow>
            </ContentCard>
          </MaxWidthWrapper>
        </ThemeSection>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}



//Style 
const ImageHeader = styled(ImageBackground)`
  width: 100%;
  height: 260px;
  justify-content: flex-end;
`;

const HeaderContent = styled.View`
  padding-bottom: 20px;
`;

const ThemeSection = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: 0px 16px 60px;
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
  margin-top: -40px;
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

const InputSpacer = styled.View`
  margin-bottom: 30px;
`;
