import React from 'react';

import {firebaseHelper} from '../api/firebaseHelper';
import TaskSchedulesContainer from '../components/TaskSchedulesContainer';
import Colors from '../constants/Colors';


export default class TaskSchedulesScreen extends React.Component {
  
  state = {
    taskSchedules: []
  }

  static navigationOptions = {
    title: 'Scheduled Tasks',
  }

  constructor(props) {
    super(props);
    this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
  }

  componentDidMount() {
    this.setupTaskSchedules();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async setupTaskSchedules() {
    this.unsubscribe = await firebaseHelper.subscribeToTaskSchedulesCollectionUpdates(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const taskSchedules = [];
    querySnapshot.forEach((doc) => {
      const taskSchedule = doc.data();
      taskSchedules.push({
        id: doc.id,
        title: taskSchedule.title,
        time_created: taskSchedule.time_created,
        repeat: taskSchedule.repeat,
        date: taskSchedule.date,
        days: taskSchedule.days,
        reminder: taskSchedule.reminder,
        reminder_time: taskSchedule.reminder_time,
        repeat_reminder_if_uncomplete: taskSchedule.repeat_reminder_if_uncomplete,
        repeat_reminder_interval: taskSchedule.repeat_reminder_interval,
        repeat_reminder_max_times: taskSchedule.repeat_reminder_max_times,
        notify_caregiver_if_uncomplete: taskSchedule.notify_caregiver_if_uncomplete,
        notify_caregiver_time: taskSchedule.notify_caregiver_time,
      });
    });
    this.setState({ 
      taskSchedules: taskSchedules
   });
  }

  render() {
    return (
      <TaskSchedulesContainer
        style={{ backgroundColor: Colors.primaryBackground }}
        screen={this.props.navigation.state.key}
        taskSchedules={this.state.taskSchedules} 
        {...this.props}
      />
    );
  }

}
