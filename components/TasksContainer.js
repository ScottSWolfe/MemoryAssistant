import React from 'react';
import { ScrollView, StyleSheet, FlatList, StatusBar, Platform, Text } from 'react-native';
import { View } from 'native-base';
import { firebaseHelper } from '../api/firebaseHelper';

import Utils from '../utils';
import CONSTANTS from '../constants';
import COLORS from '../constants/Colors';
import Header from '../components/Header';
import AddTask from '../components/AddTask';
import AddTaskButton from '../components/AddTaskButton';
import TaskItem from '../components/TaskItem';

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

export default class TasksContainer extends React.Component {
  state = {
    addingTask: false,
  };

  onAllData = (tasks, streamData) => {
    // merge streaming tasks data along with current tasks
    const tasksData = Utils.mergeTasks(tasks, streamData);

    // filter data based on "screen": [All | Active | Completed]
    const filteredData = this.filterTasksData(tasksData);

    return (
      <FlatList
        style={{ width: '100%', top: 15 }}
        data={filteredData}
        keyExtractor={item => item._id}
        renderItem={({ item: task }) => (
          <TaskItem task={task} onUpdate={firebaseHelper.updateTask} onDelete={firebaseHelper.destroy} />
        )}
      />
    );
  };

  filterTasksData = (tasksData) => {
    const { screen } = this.props;

    switch (screen) {
      case CONSTANTS.ALL:
        return tasksData;
      case CONSTANTS.ACTIVE:
        return tasksData.filter(task => !task.completed);
      case CONSTANTS.COMPLETED:
        return tasksData.filter(task => task.completed);
    }

    return tasksData;
  };

  render() {
    const isAndroid = Platform.OS === 'android';
    return (
      <View style={{ flex: 1 }}>
        <Header />
        {isAndroid ? (
          <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        ) : (
          <StatusBar backgroundColor={COLORS.primary} barStyle="dark-content" />
        )}
        <ScrollView>          
          <FlatList
            style={{ width: '100%', top: 15 }}
            data={this.filterTasksData(this.props.tasks)}
            renderItem={({ item }) => (
              <TaskItem task={item} onUpdate={firebaseHelper.updateTask} onDelete={firebaseHelper.destroyTask} />
            )}
          />
          {this.state.addingTask ? (
            <View style={styles.row}>
              <AddTask
                onAdd={(task) => {
                  this.setState({ addingTask: false });
                  firebaseHelper.addTask(task);
                }}
                onCancelDelete={() => this.setState({ addingTask: false })}
                onBlur={() => this.setState({ addingTask: false })}
              />
            </View>
          ) : null}
        </ScrollView>
        <AddTaskButton onPress={() => this.setState({ addingTask: true })} />
      </View>
    );
  }
}
