import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Background from '~/components/Background';

import {
  Container,
  Content,
  Header,
  HeaderDate,
  HeaderText,
  ContentText,
  ContentTitle,
  QuestionText,
} from './styles';

import {
  Bar,
  BarImage,
  BarButton,
  BarText,
  IconLeftButton,
  IconLeft,
} from '~/globalStyles';

import headerlogo from '~/assets/headerLogo.png';

export default function HelpOrderResponse({ navigation }) {
  const [question, setQuestion] = useState({});

  useEffect(() => {
    const item = navigation.getParam('item');
    setQuestion(item);
  }, []); // eslint-disable-line

  return (
    <Background>
      <Container>
        <Content>
          <Header>
            <HeaderText>Pergunta</HeaderText>
            <HeaderDate>{question.formated}</HeaderDate>
          </Header>
          <QuestionText>{question.question}</QuestionText>
          <ContentTitle>Resposta</ContentTitle>
          <ContentText>
            {question.answer || 'Sem resposta.'}
            {' '}
          </ContentText>
        </Content>
      </Container>
    </Background>
  );
}

HelpOrderResponse.navigationOptions = ({ navigation }) => ({
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

HelpOrderResponse.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
