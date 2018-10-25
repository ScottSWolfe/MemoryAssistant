import { createStackNavigator } from 'react-navigation';

import TaskSchedulesScreen from '../screens/TaskSchedulesScreen';
import EditTaskScheduleScreen from '../screens/EditTaskScheduleScreen';
import SelectDaysScreen from '../screens/SelectDaysScreen';
import Colors from '../constants/Colors';


export default createStackNavigator({
  TaskSchedules: TaskSchedulesScreen,
  EditTaskSchedule: EditTaskScheduleScreen,
  SelectDays: SelectDaysScreen,
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
