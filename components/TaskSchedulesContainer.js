import React from 'react';
import { ScrollView, StyleSheet, FlatList, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';

import { firebaseHelper } from '../api/firebaseHelper';
import Colors from '../constants/Colors';
import AddTaskButton from '../components/AddTaskButton';
import TaskScheduleItem from '../components/TaskScheduleItem';

const styles = StyleSheet.create({
  row: {
    top: 15,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default class TaskSchedulesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(taskSchedule) {
    firebaseHelper.destroyTaskSchedule(taskSchedule);
    firebaseHelper.destroyTasksCreatedFromTaskSchedule(taskSchedule.id);
  }
  
  render() {
    const isAndroid = Platform.OS === 'android';
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.primaryBackground }} behavior="padding" enabled>
        {isAndroid ? (
          <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        ) : (
          <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
        )}
        <ScrollView>          
          <FlatList
            style={{ width: '100%', top: 15, }}
            data={this.props.taskSchedules}
            renderItem={({ item }) => (
              <TaskScheduleItem taskSchedule={item} onDelete={(item) => this.onDelete(item)} navigation={this.props.navigation} />
            )}
            keyExtractor={(item, index) => item.id}
          />
        </ScrollView>
        <AddTaskButton onPress={() => this.props.navigation.navigate('EditTaskSchedule', {taskSchedule: null})} />
      </KeyboardAvoidingView>
    );
  }
}
