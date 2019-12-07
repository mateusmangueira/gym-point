import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const ButtonCard = styled.TouchableOpacity``;

export const Card = styled.View`
  background: #fff;
  margin-bottom: 16;
  border-width: 1;
  width: 100%;
  max-width: 300;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 4;
  padding-vertical: 16;
  padding-horizontal: 16;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const CardHeaderLeft = styled.View`
  flex-direction: row;
`;

export const CardHeaderResponse = styled.Text`
  color: ${(props) => (props.answered ? 'green' : 'rgba(0, 0, 0, 0.4)')};
  margin-left: 8;
`;

export const CardHeaderDate = styled.Text`
  color: rgba(0, 0, 0, 0.6);
`;

export const CardContent = styled.Text`
  color: rgba(0, 0, 0, 0.6);
  margin-top: 16;
`;
