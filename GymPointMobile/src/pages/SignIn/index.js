import React, { useState, useEffect } from 'react';
import {
  Alert, Image,
} from 'react-native';

import { useSelector } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';

import api from '~/services/api';

import logo from '~/assets/logo.png';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Background from '~/components/Background';


import { Container } from './styles';

export default function SignIn({ navigation }) {
  const [user, setUser] = useState('');

  const loading = useSelector((state) => state.checkIn.loading);

  useEffect(() => {
    try {
      AsyncStorage.getItem('userId').then((userId) => {
        if (userId) {
          navigation.navigate('ListOrder', { userId });
        }
      });
    } catch (error) {
      Alert.alert('Falha ao entrar na sua conta', 'Aluno não encontrado');
    }
  }, []); // eslint-disable-line

  async function handleSignIn() {
    try {
      const response = await api.post('/students/sign', { name: user });

      const { id } = response.data;

      await AsyncStorage.setItem('userId', String(id));

      setUser('');

      navigation.navigate('ListOrder', { user: id });
    } catch (error) {
      Alert.alert('Falha ao entrar', 'Aluno não encontrado');
    }
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Input
          placeholder="Informe seu ID de cadastro"
          autoCapitalize="none"
          autoCorrect={false}
          value={user}
          onChangeText={setUser}
        />

        <Button loading={loading} onPress={handleSignIn}>
            Entrar no sistema
        </Button>
      </Container>
    </Background>
  );
}
