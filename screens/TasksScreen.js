import React, {Component} from 'react';
import {firebase, firestore} from '../api/firebaseHelper';
import TasksContainer from '../components/TasksContainer';

export default class TasksScreen extends React.Component {
  
  state = {
    tasks: []
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setupTasks();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async setupTasks() {
    await this.setTasksReference();
    this.unsubscribe = this.tasksReference.onSnapshot(this.onCollectionUpdate);
  }

  async setTasksReference() {
    const user_id = firebase.auth().currentUser.uid;
    return firestore.collection('groups')
      .where('users', 'array-contains', user_id).limit(1).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.tasksReference = firestore.collection('groups').doc(doc.id).collection('tasks');
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  onCollectionUpdate = (querySnapshot) => {
    const tasks = [];
    querySnapshot.forEach((doc) => {
      const { title, completed, time_created } = doc.data();
      tasks.push({
        title: title,
        completed: completed,
        createdAt: time_created,
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
