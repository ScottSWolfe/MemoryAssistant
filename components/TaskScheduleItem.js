import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, Body } from 'native-base';

import { TrashIcon } from '../components/Icons';
import Days from '../constants/Days';


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

  getScheduleText() {
    const taskSchedule = this.props.taskSchedule;
    if (taskSchedule.repeat === true) {
      let dayString = '';
      for (let i = 0; i < Days.length; i++) {
        if (taskSchedule.days.includes(Days[i])) {
          dayString += Days[i].slice(0, 3) + '  ';
        }
      }
      return dayString;
    }
    else if (taskSchedule.repeat === false) {
      let dateString = '';
      if (taskSchedule.date) {
        dateString = taskSchedule.date.toLocaleDateString();
      }
      return dateString;
    }
    return '';
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
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 24
                  }}
                >
                  {taskSchedule.title}
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 15
                  }}
                >
                  {this.getScheduleText()}
                </Text>
              </View>
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
