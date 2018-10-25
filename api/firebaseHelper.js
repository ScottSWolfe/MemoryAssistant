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
    this.taskSchedulesReference = null;

    this.logout = this.logout.bind(this);
    this.initializeUserData = this.initializeUserData.bind(this);
    this.subscribeToTasksCollectionUpdates = this.subscribeToTasksCollectionUpdates.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.destroyTask = this.destroyTask.bind(this);
    this.addTaskSchedule = this.addTaskSchedule.bind(this);
    this.updateTaskSchedule = this.updateTaskSchedule.bind(this);
    this.destroyTaskSchedule = this.destroyTaskSchedule.bind(this);
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
    this.groupId = await this.getUsersGroupId();
    this.tasksReference = this.getTasksCollectionReference(this.groupId);
    this.taskSchedulesReference = this.getTaskSchedulesCollectionReference(this.groupId);
  }

  getCurrentUserId() {
    let user = this.firebase.auth().currentUser;
    return user ? user.uid : null;
  }

  getTasksCollectionReference(groupId) {
    return this.firestore.collection('groups').doc(groupId).collection('tasks');
  }

  getTaskSchedulesCollectionReference(groupId) {
    return this.firestore.collection('groups').doc(groupId).collection('task_schedules');
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

  async subscribeToTaskSchedulesCollectionUpdates(callback) {
    return this.taskSchedulesReference
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

  async addTaskSchedule(taskSchedule) {
    return this.taskSchedulesReference.add({
      title: taskSchedule.title,
      time_created: this.getCurrentTimestamp(),
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
  }

  async updateTaskSchedule(editedTaskSchedule) {
    console.log('updateTaskSchedule');
    console.log(editedTaskSchedule);
    return this.taskSchedulesReference.doc(editedTaskSchedule.id).update(
      {
        title: editedTaskSchedule.title,
        repeat: editedTaskSchedule.repeat,
        date: this.changeDateToFirestoreTimestamp(editedTaskSchedule.date),
        days: editedTaskSchedule.days,
        reminder: editedTaskSchedule.reminder,
        reminder_time: this.changeDateToFirestoreTimestamp(editedTaskSchedule.reminder_time),
        repeat_reminder_if_uncomplete: editedTaskSchedule.repeat_reminder_if_uncomplete,
        repeat_reminder_interval: editedTaskSchedule.repeat_reminder_interval,
        repeat_reminder_max_times: editedTaskSchedule.repeat_reminder_max_times,
        notify_caregiver_if_uncomplete: editedTaskSchedule.notify_caregiver_if_uncomplete,
        notify_caregiver_time: this.changeDateToFirestoreTimestamp(editedTaskSchedule.notify_caregiver_time),
        }
    );
  };

  async destroyTaskSchedule(taskSchedule) {
    return this.taskSchedulesReference.doc(taskSchedule.id).delete();
  };

  getStartOfTodayTimestamp() {
    return this.firebase.firestore.Timestamp.fromMillis(new Date().setHours(0, 0, 0, 0));
  };

  getCurrentTimestamp() {
    return this.firebase.firestore.FieldValue.serverTimestamp();
  }

  changeDateToFirestoreTimestamp(date) {
    if (!date) {
      return null;
    }
    return this.firebase.firestore.Timestamp.fromDate(date);
  }

  changeFirestoreTimestampToDate(timestamp) {
    if (!timestamp) {
      return null;
    }
    return timestamp.toDate();
  }

}

let firebaseHelper = new FirebaseHelper();

export { firebase, firestore, firebaseHelper };
