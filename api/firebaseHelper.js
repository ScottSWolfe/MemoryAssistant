import firebase from 'firebase';
import ApiKeys from '../constants/ApiKeys';
require("firebase/firestore");

// initialize firebase
firebase.initializeApp(ApiKeys.FirebaseConfig);

// initialize firestore
var firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true};
firestore.settings(settings);


class FirebaseHelper {

  constructor() {
    this.firestore = firestore;
    this.firebase = firebase;
    this.tasksReference = null;
    
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.destroyTask = this.destroyTask.bind(this);
  }

  async login(email, password) {
    return this.firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.firebase.auth().signOut();
  }

  getCurrentUserId() {
    let user = this.firebase.auth().currentUser;
    return user ? user.uid : null;
  }

  async getUsersGroup() {
    // note that this only retrieves
    // the first group found for a user

    const userId = this.getCurrentUserId();
    if (!userId) {
      return null;
    }

    return firestore.collection('groups')
      .where('users', 'array-contains', userId)
      .limit(1)
      .get();
  }

  async setupReferenceToTasksCollection() {
    try {
      snapshot = await this.getUsersGroup();
      snapshot.forEach((doc) => {
        this.tasksReference = firestore.collection('groups').doc(doc.id).collection('tasks');
      });
    }
    catch (error) {
      console.log('Error getting documents', error);
    }
  }

  async subscribeToTasksCollectionUpdates(callback) {
    await this.setupReferenceToTasksCollection();
    this.tasksReference.onSnapshot(callback);
  }

  async addTask(task) {
    return this.tasksReference.add({
      title: task.title,
      completed: task.completed,
      time_created: firebase.firestore.FieldValue.serverTimestamp()
    });  
  }

  async updateTask(editedTask) {
    return this.tasksReference.doc(editedTask.id).update(
      {
        title: editedTask.title,
        time_created: editedTask.time_created,
        completed: editedTask.completed
      }
    );
  };

  async destroyTask(task) {
    return this.tasksReference.doc(task.id).delete();
  };

}

let firebaseHelper = new FirebaseHelper();

export { firebase, firestore, firebaseHelper };
