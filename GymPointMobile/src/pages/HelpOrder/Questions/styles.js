import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Content = styled.View`
  background: #fff;
  margin-top: 32;
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 5;
  padding: 0 20px 20px;
  width: 100%;
  max-width: 300;
`;

export const Header = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;
export const HeaderText = styled.Text`
  text-transform: uppercase;
  color: #333;
  font-weight: bold;
  font-size: 16;
`;
export const HeaderDate = styled.Text`
  color: rgba(0, 0, 0, 0.4);
`;
export const QuestionText = styled.Text`
  margin-top: 24;
  color: rgba(0, 0, 0, 0.4);
`;

export const ContentTitle = styled.Text`
  text-transform: uppercase;
  color: #333;
  font-weight: bold;
  font-size: 16;
  margin-top: 24;
`;

export const ContentText = styled.Text`
  color: rgba(0, 0, 0, 0.4);
  margin-top: 24;
`;
