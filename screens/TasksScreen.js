import React from 'react';
import {firebaseHelper} from '../api/firebaseHelper';
import TasksContainer from '../components/TasksContainer';

export default class TasksScreen extends React.Component {
  
  state = {
    tasks: []
  }

  constructor(props) {
    super(props);
    this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
  }

  componentDidMount() {
    this.setupTasks();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async setupTasks() {
    this.unsubscribe = await firebaseHelper.subscribeToTasksCollectionUpdates(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const tasks = [];
    const startOfToday = firebaseHelper.getStartOfTodayTimestamp();
    querySnapshot.forEach((doc) => {
      if (this.shouldDisplayTask(doc, startOfToday)) {
        const { title, completed, time_created } = doc.data();
        tasks.push({
          title: title,
          completed: completed,
          time_created: time_created,
          id: doc.id
        });
      }
    });
    this.setState({ 
      tasks: tasks
   });
  }

  shouldDisplayTask(doc, startOfToday) {
    const { time_created, from_scheduled_task, completed, time_completed } = doc.data();

    // display task if it was created today
    if (time_created >= startOfToday) {
      return true;
    }

    // display task if it was completed today
    if (completed === true && time_completed >= startOfToday) {
      return true;
    }

    // display task if it is a one-time task that has not been completed
    if (from_scheduled_task === false && completed === false) {
      return true;
    } 

    // otherwise, do not display the task
    return false;
  }

  render() {
    return (
      <TasksContainer 
        screen={this.props.navigation.state.key} 
        tasks={this.state.tasks} 
        tasksReference={this.tasksReference}
        {...this.props} 
      />
    );
  }

}
