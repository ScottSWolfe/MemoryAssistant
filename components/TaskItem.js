import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, CheckBox } from 'react-native';
import { View, Body } from 'native-base';

import { TrashIcon } from '../components/Icons';
import { firebaseHelper } from '../api/firebaseHelper';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },

  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

class TaskItem extends Component {

  onTaskItemToggle = (task, propAction) => {
    let timeCompleted = null;
    if (task.completed === false) {
      timeCompleted = firebaseHelper.getCurrentTimestamp();
    }
    propAction({
      ...task,
      completed: !task.completed,
      time_completed: timeCompleted,
    });
  };

  render() {
    const { task, onUpdate, onDelete } = this.props;

    return (
      <View style={styles.row}>
        <View
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 10,
            paddingVertical: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => this.onTaskItemToggle(task, onUpdate)}
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
            }}
          >
            <CheckBox
              value={task.completed}
              onValueChange={() => this.onTaskItemToggle(task, onUpdate)}
            />
            <Body
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingLeft: 25,
              }}
            >
              <Text
                style={{
                  color: task.completed ? 'grey' : 'black',
                  textDecorationLine: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.title}
              </Text>
            </Body>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(task)}
            style={{ paddingLeft: 25, paddingRight: 15 }}
          >
            <TrashIcon/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default TaskItem;
