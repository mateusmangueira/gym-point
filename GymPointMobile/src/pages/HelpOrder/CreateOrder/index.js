import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

import Button from '~/components/Button';
import api from '~/services/api';

import Background from '~/components/Background';

import { loadHelpordersRequest } from '~/store/modules/helpOrder/actions';

import { Container, InputText } from './styles';
import {
  Bar,
  BarImage,
  BarButton,
  BarText,
  IconLeftButton,
  IconLeft,
} from '~/globalStyles';

import headerlogo from '~/assets/halter.png';

export default function CreateOrder() {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');

  function handleCreateHelpOrder() {
    async function createHelp() {
      const userId = await AsyncStorage.getItem('userId');
      const response = await api.post(`/students/${userId}/help-orders`, {
        question,
      });
      if (response) {
        setQuestion('');
        Alert.alert(
          'Pergunta foi enviada com sucesso',
          'Sua pergunta foi criada, em breve retornaremos a resposta.',
        );
      } else {
        Alert.alert(
          'Pergunta infelizmente falhou',
          'Não foi possível realizar pergunta, tente novamente mais tarde.',
        );
      }
      dispatch(loadHelpordersRequest(userId));
    }
    createHelp();
  }

  return (
    <Background>
      <Container>
        <InputText
          placeholder="Escreva seu pedido de auxílio"
          value={question}
          onChangeText={setQuestion}
          numberOfLines={4}
          returnKeyType="send"
          multiline
        />
        <Button onPress={() => handleCreateHelpOrder()} loading={false}>
          Enviar pedido de auxílio
        </Button>
      </Container>
    </Background>
  );
}

CreateOrder.navigationOptions = ({ navigation }) => ({
  header: (
    <Bar>
      <IconLeftButton onPress={() => navigation.navigate('ListOrder')}>
        <IconLeft name="chevron-left" size={30} />
      </IconLeftButton>
      <BarButton onPress={() => navigation.navigate('ListOrder')}>
        <BarImage source={headerlogo} />
        <BarText>Gympoint</BarText>
      </BarButton>
    </Bar>
  ),
  headerStyle: {
    backgroundColor: '#e3e3e3',
  },
  headerTintColor: '#606070',
});
