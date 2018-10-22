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

    this.userId = null;
    this.tasksReference = null;
    	
    this.initializeUserData = this.initializeUserData.bind(this);
    this.subscribeToTasksCollectionUpdates = this.subscribeToTasksCollectionUpdates.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.destroyTask = this.destroyTask.bind(this);
    this.getCurrentTimestamp = this.getCurrentTimestamp.bind(this);
    this.getStartOfTodayTimestamp = this.getStartOfTodayTimestamp.bind(this);
  }

  async signUp(email, password) {
    return this.firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  async login(email, password) {
    return this.firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.firebase.auth().signOut();
  }

  async onAuthStateChanged(callback) {
    this.firebase.auth().onAuthStateChanged(callback);
  }

  async initializeUserData() {
    this.userId = this.getCurrentUserId();
    this.tasksReference = await this.getTasksCollectionReference();
  }

  getCurrentUserId() {
    let user = this.firebase.auth().currentUser;
    return user ? user.uid : null;
  }

  async getTasksCollectionReference() {
    const groupId = await this.getUsersGroupId();
    return this.firestore.collection('groups').doc(groupId).collection('tasks');
  }

  async getUsersGroupId() {
    const snapshot = await this.findUsersGroup();
    let groupId;
    if (snapshot.empty) {
       const newDoc = await this.createUsersGroup();
       groupId = newDoc.id;
    }
    else {
      groupId = snapshot.docs[0].id;
    }
    return groupId;
  }

  async findUsersGroup() {
    return this.firestore.collection('groups')
      .where('users', 'array-contains', this.userId)
      .limit(1)
      .get();
  }

  async createUsersGroup() {
    return this.firestore.collection('groups').add({
      users: [this.userId]
    })
  }

  async subscribeToTasksCollectionUpdates(callback) {
    return this.tasksReference
      .orderBy('time_created')
      .onSnapshot(callback);
  }

  async addTask(task) {
    return this.tasksReference.add({
      title: task.title,
      completed: task.completed,
      time_created: this.getCurrentTimestamp(),
      from_scheduled_task: false
    });
  }

  async updateTask(editedTask) {
    return this.tasksReference.doc(editedTask.id).update(
      {
        title: editedTask.title,
        time_created: editedTask.time_created,
        completed: editedTask.completed,
        time_completed: editedTask.time_completed
      }
    );
  };

  async destroyTask(task) {
    return this.tasksReference.doc(task.id).delete();
  };

  getStartOfTodayTimestamp() {
    return this.firebase.firestore.Timestamp.fromMillis(new Date().setHours(0, 0, 0, 0));
  };

  getCurrentTimestamp() {
    return this.firebase.firestore.FieldValue.serverTimestamp();
  }

}

let firebaseHelper = new FirebaseHelper();

export { firebase, firestore, firebaseHelper };
