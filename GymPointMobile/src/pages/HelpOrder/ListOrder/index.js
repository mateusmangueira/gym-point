import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { loadHelpordersRequest } from '~/store/modules/helpOrder/actions';

import Button from '~/components/Button';
import Background from '~/components/Background';

import {
  Container,
  List,
  ButtonCard,
  Card,
  CardHeader,
  CardHeaderLeft,
  CardHeaderDate,
  CardHeaderResponse,
  CardContent,
} from './styles';

import { BarImage, BarButton, BarText } from '~/globalStyles';

import headerlogo from '~/assets/halter.png';

export default function ListOrder({ navigation }) {
  const dispatch = useDispatch();

  function parseData(allHelpOrders) {
    const allNewDates = allHelpOrders.map((item) => {
      const formated = formatRelative(parseISO(item.updatedAt), new Date(), {
        locale: pt,
        addSuffix: true,
        includeSeconds: true,
      });
      return { ...item, formated };
    });
    return allNewDates;
  }

  const helps = useSelector((state) => parseData(state.helpOrder.allHelpOrders));

  useEffect(() => {
    async function getHelporders() {
      await AsyncStorage.getItem('userId').then((userId) => {
        if (userId) {
          dispatch(loadHelpordersRequest(userId));
        }
      });
    }
    getHelporders();
  }, []); // eslint-disable-line

  async function logout() {
    try {
      await AsyncStorage.removeItem('userId');
      navigation.navigate('SignIn');
    } catch (exception) {
      Alert.alert('Erro ao sair', 'Não foi possível deslogar');
    }
  }

  return (
    <Background>
      <Container>
        <Button
          onPress={() => navigation.navigate('CreateOrder')}
          loading={false}
        >
          Novo pedido de auxílio
        </Button>

        <List
          data={helps}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ButtonCard
              onPress={() => navigation.navigate('HelpOrderResponse', { item })}
            >
              <Card>
                <CardHeader>
                  <CardHeaderLeft>
                    <Icon
                      name="check-circle"
                      size={20}
                      color={item.answer ? 'green' : 'rgba(0, 0, 0, 0.4)'}
                    />
                    <CardHeaderResponse answered={item.answer}>
                      {item.answer ? 'Respondido' : 'Ainda sem resposta'}
                    </CardHeaderResponse>
                  </CardHeaderLeft>
                  <CardHeaderDate>{item.formated}</CardHeaderDate>
                </CardHeader>
                <CardContent>{item.question}</CardContent>
              </Card>
            </ButtonCard>
          )}
        />
        <Button onPress={logout} loading={false}>
          Sair
        </Button>
      </Container>
    </Background>
  );
}

ListOrder.navigationOptions = () => ({
  header: (
    <BarButton onPress={() => { }}>
      <BarImage source={headerlogo} />
      <BarText>Gympoint</BarText>
    </BarButton>
  ),
  headerStyle: {
    backgroundColor: '#e3e3e3',
  },
  headerTintColor: '#606070',
});

ListOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
