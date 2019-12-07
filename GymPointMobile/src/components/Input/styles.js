import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  border: rgba(0, 0, 0, 0.05);
  margin-top: 15px;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0,0,0,0.2)',
})`
  flex: 0.8;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
`;
