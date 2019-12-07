import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import CheckIn from '~/pages/CheckIn';

import ListOrder from '~/pages/HelpOrder/ListOrder';
import CreateOrder from '~/pages/HelpOrder/CreateOrder';
import HelpOrderResponse from '~/pages/HelpOrder/Questions';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    App: createBottomTabNavigator(
      {
        'Check-ins': {
          screen: createStackNavigator(
            {
              CheckIn,
            },
            {
              defaultNavigationOptions: {
                headerTransparent: false,
                headerTintColor: '#f84e62',
                headerLeftContainerStyle: {
                  marginLeft: 20,
                },
              },
            },
          ),
          navigationOptions: {
            tabBarVisible: true,
            tabBarLabel: '',
            tabBarLabelTintColor: '#f84e62',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="offline-pin" size={20} color={tintColor} />
            ),
          },
        },
        NewHelp: {
          screen: createStackNavigator(
            {
              ListOrder,
              CreateOrder,
              HelpOrderResponse,
            },
            {
              defaultNavigationOptions: {
                headerTransparent: false,
                headerTintColor: '#f84e62',
                headerLeftContainerStyle: {
                  marginLeft: 20,
                },
              },
            },
          ),
          navigationOptions: {
            tabBarVisible: true,
            tabBarLabel: 'Pedir Ajuda',
            tabBarLabelTintColor: '#f84e62',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="help" size={20} color={tintColor} />
            ),
          },
        },
      },
      {
        resetOnBlur: true,
        tabBarOptions: {

          keyboardHidesTabBar: true,
          activeTintColor: '#f84e62',
          inactiveTintColor: '#aaa',

          style: {
            backgroundColor: '#fff',
            borderTopColor: '#eee',
            borderBottomColor: '#fff',
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            height: 80,
          },
        },
      },
    ),
  }),
);
