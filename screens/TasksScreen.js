import React, {Component, KeyboardAvoidingView} from 'react';
import {firebase, firestore, firebaseHelper} from '../api/firebaseHelper';
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
    querySnapshot.forEach((doc) => {
      const { title, completed, time_created } = doc.data();
      tasks.push({
        title: title,
        completed: completed,
        time_created: time_created,
        id: doc.id
      });
    });
    this.setState({ 
      tasks: tasks
   });
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
