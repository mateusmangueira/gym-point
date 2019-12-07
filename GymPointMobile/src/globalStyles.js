import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Bar = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const BarButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50;
`;

export const BarImage = styled.Image`
  width: 50;
  height: 25;
`;

export const BarText = styled.Text`
  margin-left: 8;
  text-transform: uppercase;
  font-weight: bold;
  color: #f84e62;
`;

export const IconLeftButton = styled.TouchableOpacity`
  justify-content: flex-start;
  margin-right: 90;
`;

export const IconLeft = styled(Icon)`
  color: #f84e62;
`;
