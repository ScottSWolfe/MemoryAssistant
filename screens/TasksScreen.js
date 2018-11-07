import React from 'react';

import {firebaseHelper} from '../api/firebaseHelper';
import TasksContainer from '../components/TasksContainer';
import Colors from '../constants/Colors';


export default class TasksScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Today\'s Tasks',
  }

  state = {
    tasks: []
  }

  constructor(props) {
    super(props);
    this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
    this.onTaskUpdated = this.onTaskUpdated.bind(this);
    this.onTaskAdded = this.onTaskAdded.bind(this);
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

  onTaskUpdated(task) {
    if (!task) {
      return;
    }

    // local update
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (task.id == this.state.tasks[i].id) {
        let newTasks = this.state.tasks.slice(0);
        newTasks[i] = task;
        this.setState({
          tasks: newTasks
        });
        break;
      }
    }

    // server update
    firebaseHelper.updateTask(task);
  }

  onTaskAdded(task) {
    if (!task) {
      return;
    }

    // local add
    let newTasks = this.state.tasks.slice(0);
    newTasks.push(task);
    this.setState({
      tasks: newTasks
    });

    // server add
    firebaseHelper.addTask(task);
  }

  render() {
    return (
      <TasksContainer 
        style={{ backgroundColor: Colors.primaryBackground }}
        screen={this.props.navigation.state.key} 
        tasks={this.state.tasks} 
        tasksReference={this.tasksReference}
        onTaskUpdated={this.onTaskUpdated}
        onTaskAdded={this.onTaskAdded}
        {...this.props} 
      />
    );
  }

}
