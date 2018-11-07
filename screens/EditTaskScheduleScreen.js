import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Colors from '../constants/Colors';
import Divider from '../components/Divider';
import { firebaseHelper } from '../api/firebaseHelper';


export default class EditTaskScheduleScreen extends Component {

  state = {
    title: '',
    repeat: true,
    date: null,
    days: [],
    reminder: true,
    reminder_time: null,
    repeat_reminder_if_uncomplete: false,
    repeat_reminder_interval: 15,
    repeat_reminder_max_times: 3,
    notify_caregiver_if_uncomplete: false,
    notify_caregiver_time: null,

    new_task_schedule: true,

    isDatePickerVisible: false,
    isReminderTimePickerVisible: false,
    isNotifyTimePickerVisible: false,
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Schedule a Task',
  
      headerRight: (
        <TouchableOpacity onPress={() => navigation.getParam('onSave', () => {})()} style={{ paddingRight: 10, }}>
          <Text style={{ color: Colors.tabBar, }}>
            Save
          </Text>
        </TouchableOpacity>
      ),

      headerLeft: (
        <TouchableOpacity onPress={() => navigation.pop()} style={{ paddingLeft: 10, }}>
          <Text style={{ color: Colors.tabBar, }}>
            Cancel
          </Text>
        </TouchableOpacity>
      ),
    }
  }

  constructor(props) {
    super(props);
    this.updateDays = this.updateDays.bind(this);
  }

  componentDidMount() {
    let taskSchedule = this.props.navigation.getParam('taskSchedule', null);
    if (taskSchedule) {
      this.setState({
        id: taskSchedule.id,
        title: taskSchedule.title,
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

        new_task_schedule: false,
      });
    }
    this.props.navigation.setParams({ 
      onSave: this.onSave.bind(this)
    });
  }

  getTaskScheduleFromState() {
    return {
      id: this.state.id,
      title: this.state.title,
      repeat: this.state.repeat,
      date: this.state.date,
      days: this.state.days,
      reminder: this.state.reminder,
      reminder_time: this.state.reminder_time,
      repeat_reminder_if_uncomplete: this.state.repeat_reminder_if_uncomplete,
      repeat_reminder_interval: this.state.repeat_reminder_interval,
      repeat_reminder_max_times: this.state.repeat_reminder_max_times,
      notify_caregiver_if_uncomplete: this.state.notify_caregiver_if_uncomplete,
      notify_caregiver_time: this.state.notify_caregiver_time,
    }
  }

  async onSave() {
    let taskSchedule = this.getTaskScheduleFromState();
    if (this.state.new_task_schedule) {
      firebaseHelper.addTaskSchedule(taskSchedule);
    }
    else {
      firebaseHelper.updateTaskSchedule(taskSchedule);
    }
    this.props.navigation.navigate('TaskSchedules');
  }

  updateDays(days) {
    this.setState({
      days: days
    });
  }

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });
 
  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });
 
  _handleDatePicked = (date) => {
    this.setState({
      date: date
    });
    this._hideDatePicker();
  };

  _showReminderTimePicker = () => this.setState({ isReminderTimePickerVisible: true });
 
  _hideReminderTimePicker = () => this.setState({ isReminderTimePickerVisible: false });
 
  _handleReminderTimePicked = (date) => {
    date.setSeconds(0);
    this.setState({
      reminder_time: date
    });
    this._hideReminderTimePicker();
  };

  _showNotifyTimePicker = () => this.setState({ isNotifyTimePickerVisible: true });
 
  _hideNotifyTimePicker = () => this.setState({ isNotifyTimePickerVisible: false });
 
  _handleNotifyTimePicked = (date) => {
    date.setSeconds(0);
    this.setState({
      notify_caregiver_time: date
    });
    this._hideNotifyTimePicker();
  };

  maxReminderTimesChanged(number) {
    this.setState({
      maxReminderTimesChanged: number
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: Colors.primaryBackground }}>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderFont}>
            Task
          </Text>
        </View>
        <Divider/>

        <View >
          <TouchableOpacity style={styles.row} onPress={() => this._titleTextInput.focus()}>
            <Text style={styles.settingsLabels}>
              Title:
            </Text>
            <TextInput 
              style={styles.userEnteredText} 
              underlineColorAndroid="transparent"
              placeholder="Enter Title" 
              autoCapitalize="sentences"
              ref={component => this._titleTextInput = component}
              onChangeText={(text) => this.setState({ title: text })}
            >
              {this.state.title}
            </TextInput>
          </TouchableOpacity>
        </View>

        <Divider/>

        <View style={styles.row}>
          <Text style={styles.settingsLabels}>
            Repeat
          </Text>
          <Switch
            value={this.state.repeat}
            onValueChange={(bool) => this.setState({ repeat: bool })}
          />
        </View>

        <Divider/>

        {
          this.state.repeat ? null : (
            <View>
              <View>
                <TouchableOpacity onPress={this._showDatePicker} style={styles.row}>
                  <Text style={styles.settingsLabels}>
                    Date:
                  </Text>
                  <Text style={styles.userEnteredText} >
                    { this.state.date ? this.state.date.toLocaleDateString() : null}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  mode={'date'}
                  isVisible={this.state.isDatePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDatePicker}
                />
              </View>
              <Divider/>
            </View>
          )
        }

        { this.state.repeat ? (
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectDays', {days: this.state.days, update: this.updateDays})}>
              <View style={styles.row}>
                <Text style={styles.settingsLabels}>
                  Select Days to Repeat
                </Text>
              </View>
            </TouchableOpacity>
            <Divider/>
          </View>
        ) : null
        }

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderFont}>
            Patient Reminders
          </Text>
        </View>
        <Divider/>

        <View style={styles.row}>
          <Text style={styles.settingsLabels}>
            Remind Patient
          </Text>
          <Switch
            value={this.state.reminder}
            onValueChange={(bool) => this.setState({ reminder: bool })}
          />
        </View>

        <Divider/>

        {
          this.state.reminder ? (
            <View>
              <View>
                <TouchableOpacity onPress={this._showReminderTimePicker} style={styles.row}>
                  <Text style={styles.settingsLabels}>
                    Reminder Time:
                  </Text>
                  <Text style={styles.userEnteredText} >
                    { this.state.reminder_time ? this.state.reminder_time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : null}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  mode={'time'}
                  isVisible={this.state.isReminderTimePickerVisible}
                  onConfirm={this._handleReminderTimePicked}
                  onCancel={this._hideReminderTimePicker}
                />
              </View>
              <Divider/>
            </View>
          )
          : null
        }

        {
          this.state.reminder ? (
            <View>
              <View style={styles.row}>
                <Text style={styles.settingsLabels}>
                  Repeat Reminder if Uncomplete
                </Text>
                <Switch
                  value={this.state.repeat_reminder_if_uncomplete}
                  onValueChange={(bool) => this.setState({ repeat_reminder_if_uncomplete: bool })}
                />
              </View>
              <Divider/>
            </View>
          )
          : null
        }

        {
          this.state.repeat_reminder_if_uncomplete && this.state.reminder ? (
            <View>
              <View >
                <TouchableOpacity style={styles.row} onPress={() => this._repeatTimesTextInput.focus()}>
                  <Text style={styles.settingsLabels}>
                    Repeat How Many Times
                  </Text>
                  <TextInput 
                    ref={component => this._repeatTimesTextInput = component}
                    underlineColorAndroid="transparent"
                    style={styles.userEnteredText}
                    keyboardType = 'numeric'
                    onChangeText = {(text) => this.setState({ repeat_reminder_max_times: text })}
                  >
                    {this.state.repeat_reminder_max_times}
                  </TextInput>
                </TouchableOpacity>
              </View>
              <Divider/>
            </View>
          )
          : null
        }

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderFont}>
            Caregiver Notifications
          </Text>
        </View>
        <Divider/>

        <View style={styles.row}>
          <Text style={styles.settingsLabels}>
            Notify Caregiver if Uncomplete
          </Text>
          <Switch
            value={this.state.notify_caregiver_if_uncomplete}
            onValueChange={(bool) => this.setState({ notify_caregiver_if_uncomplete: bool })}
          />
        </View>

        <Divider/>

        {
          this.state.notify_caregiver_if_uncomplete ? (
            <View>
              <View>
                <TouchableOpacity onPress={this._showNotifyTimePicker} style={styles.row}>
                  <Text style={styles.settingsLabels}>
                    Notify Time:
                  </Text>
                  <Text style={styles.userEnteredText} >
                    { this.state.notify_caregiver_time ? this.state.notify_caregiver_time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : null}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  mode={'time'}
                  isVisible={this.state.isNotifyTimePickerVisible}
                  onConfirm={this._handleNotifyTimePicked}
                  onCancel={this._hideNotifyTimePicker}
                />
              </View>
              <Divider/>
            </View>
          ) 
          : null
        }
        

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  settingsLabels: {
    fontSize: 20,
  },
  userEnteredText: {
    fontSize: 20,
    color: 'grey',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  sectionHeader: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    paddingBottom: 5,
    backgroundColor: Colors.secondary,
  },
  sectionHeaderFont: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primary,
  }
});
