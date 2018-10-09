import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TasksScreen from '../screens/TasksScreen';
import { MaterialIcons } from '@expo/vector-icons';

/*
const AllStack = createStackNavigator(
  {
    All: TasksScreen
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <MaterialIcons
          name={'format-list-bulleted'}
          size={28}
          style={{ marginBottom: -3 }}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      ),
    }
  }
);

const ActiveStack = createStackNavigator({
  Active: TasksScreen,
});

ActiveStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      name={'filter-center-focus'}
      size={28}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

const CompletedStack = createStackNavigator({
  Completed: TasksScreen,
});

CompletedStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      name={'playlist-add-check'}
      size={28}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};
*/

_getStackNavigator = (title, iconName) => {
  return createStackNavigator(
    {
      All: TasksScreen,
      Active: TasksScreen,
      Completed: TasksScreen,
    },
    {
      navigationOptions: {
        header: null,
        title: title,
        tabBarIcon: ({ focused }) => (
          <MaterialIcons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        ),
      }
    }
  );
}

const AllStack = _getStackNavigator('All', 'format-list-bulleted');
const ActiveStack = _getStackNavigator('Active', 'filter-center-focus');
const CompletedStack = _getStackNavigator('Completed', 'playlist-add-check');

export default createBottomTabNavigator({
  AllStack,
  ActiveStack,
  CompletedStack,
},
{
  animationEnabled: true,
  swipeEnabled: true,
}
);
