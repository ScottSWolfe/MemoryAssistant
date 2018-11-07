import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, Body } from 'native-base';

import { TrashIcon } from '../components/Icons';


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

class TaskScheduleItem extends Component {

  constructor(props) {
    super(props);
    this.onTaskScheduleItemTouch = this.onTaskScheduleItemTouch.bind(this);
  }

  onTaskScheduleItemTouch(taskSchedule) {
    this.props.navigation.navigate('EditTaskSchedule', { taskSchedule: taskSchedule });
  }

  render() {    
    const { taskSchedule, onDelete } = this.props;

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
            onPress={() => this.onTaskScheduleItemTouch(taskSchedule)}
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
            }}
          >
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
                  color: 'black',
                }}
              >
                {taskSchedule.title}
              </Text>
            </Body>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(taskSchedule)}
            style={{ paddingLeft: 25, paddingRight: 15 }}
          >
            <TrashIcon/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default TaskScheduleItem;
