import React from 'react';
import { Icon } from 'react-native-vector-icons';
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';
import CONSTANTS from '../constants/index';
import TasksNavigator from '../navigation/TasksNavigator';
import TaskSchedulesNavigator from '../navigation/TaskSchedulesNavigator';


const commonNavigationOptions = ({ navigation }) => ({
  title: navigation.state.routeName,
});

const TabNav = createBottomTabNavigator(
  {
    [CONSTANTS.TODAY]: {
      screen: TasksNavigator,
      navigationOptions: commonNavigationOptions,
    },
    [CONSTANTS.SCHEDULE]: { 
      screen: TaskSchedulesNavigator,
      navigationOptions: commonNavigationOptions,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case CONSTANTS.TODAY:
            iconName = 'format-list-bulleted';
            break;
          case CONSTANTS.ACTIVE:
            iconName = 'filter-center-focus';
            break;
          case CONSTANTS.SCHEDULE:
            iconName = 'playlist-add-check';
        }
        return (
          <Icon
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
      title: 'The Title',
    }),
  },
);

export default TabNav;
