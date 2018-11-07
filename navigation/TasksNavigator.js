import { createStackNavigator } from 'react-navigation';

import TasksScreen from '../screens/TasksScreen';
import Colors from '../constants/Colors';


export default createStackNavigator({
  Tasks: TasksScreen,
},
{
  navigationOptions: {
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.tabBar,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});
