import React from 'react';
import { ScrollView, StyleSheet, FlatList, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';
import { View } from 'native-base';

import { firebaseHelper } from '../api/firebaseHelper';
import COLORS from '../constants/Colors';
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

  componentDidMount() {
    const isAndroid = Platform.OS === 'android';
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      if (isAndroid) {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(COLORS.altPrimary);
      } else {
        StatusBar.setBarStyle('light-content');
      }
    });
  }

  render() {
    const isAndroid = Platform.OS === 'android';
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.primaryBackground }} behavior="padding" enabled>
        <ScrollView>          
          <FlatList
            style={{ width: '100%', top: 15 }}
            data={this.props.tasks}
            renderItem={({ item }) => (
              <TaskItem task={item} onUpdate={this.props.onTaskUpdated} onDelete={firebaseHelper.destroyTask} />
            )}
            keyExtractor={(item, index) => item.id}
          />
          {this.state.addingTask ? (
            <View style={styles.row}>
              <AddTask
                onAdd={(task) => {
                  this.setState({ addingTask: false });
                  this.props.onTaskAdded(task);
                }}
                onCancelDelete={() => this.setState({ addingTask: false })}
                onBlur={() => this.setState({ addingTask: false })}
              />
            </View>
          ) : null}
        </ScrollView>
        <AddTaskButton color={COLORS.altPrimary} onPress={() => this.setState({ addingTask: true })} />
      </KeyboardAvoidingView>
    );
  }
}
