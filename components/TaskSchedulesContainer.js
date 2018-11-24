import React from 'react';
import { ScrollView, FlatList, StatusBar, Platform, KeyboardAvoidingView, View } from 'react-native';

import { firebaseHelper } from '../api/firebaseHelper';
import Colors from '../constants/Colors';
import AddTaskButton from '../components/AddTaskButton';
import TaskScheduleItem from '../components/TaskScheduleItem';
import Divider from '../components/Divider';


export default class TaskSchedulesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const isAndroid = Platform.OS === 'android';
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      if (isAndroid) {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(Colors.primary);
      } else {
        StatusBar.setBarStyle('light-content');
      }
    });
  }

  onDelete(taskSchedule) {
    firebaseHelper.destroyTaskSchedule(taskSchedule);
    firebaseHelper.destroyTasksCreatedFromTaskSchedule(taskSchedule.id);
  }
  
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.primaryBackground }} behavior="padding" enabled>
        <ScrollView>          
          <FlatList
            style={{ width: '100%', top: 15, }}
            data={this.props.taskSchedules}
            renderItem={({ item }) => (
              <View>
                <TaskScheduleItem taskSchedule={item} onDelete={(item) => this.onDelete(item)} navigation={this.props.navigation} />
                <Divider />
              </View>
            )}
            keyExtractor={(item, index) => item.id}
          />
        </ScrollView>
        <AddTaskButton color={Colors.primary} onPress={() => this.props.navigation.navigate('EditTaskSchedule', {taskSchedule: null})} />
      </KeyboardAvoidingView>
    );
  }
}
