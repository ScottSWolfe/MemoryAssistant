import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Switch, StyleSheet, FlatList } from 'react-native';

import Colors from '../constants/Colors';
import Divider from '../components/Divider';
import daysOfWeek from '../constants/Days';

//const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default class SelectDaysScreen extends Component {

  state = {
    daysSelected: []
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Select Days to Repeat',
  
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.pop()} style={{ paddingLeft: 10, }}>
          <Text style={{ color: Colors.tabBar, }}>
            Back
          </Text>
        </TouchableOpacity>
      ),
    }
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.notifyParent = this.props.navigation.getParam('update', null);
    let days = this.props.navigation.getParam('days', []);
    this.setState({
      daysSelected: days
    });
  }

  onDayTouched(day) {
    let index = this.state.daysSelected.indexOf(day);
    let newDays = this.state.daysSelected.slice(0);
    if (index >= 0) {
      newDays.splice(index, 1);
    }
    else {
      newDays.push(day);
    }
    this.setState({
      daysSelected: newDays
    });

    this.notifyParent(newDays);
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: Colors.primaryBackground }}>
        <FlatList
          data={daysOfWeek}
          extraData={this.state.daysSelected}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity onPress={() => this.onDayTouched(item)} >
                <View style={[styles.row, this.state.daysSelected.indexOf(item) >= 0 && styles.selected]} >
                  <Text style={{ fontSize: 20, }}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
              <Divider/>
            </View>
          )}
          keyExtractor={(item, index) => item}
        />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  settingsLabels: {
    fontSize: 20,
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
    backgroundColor: Colors.primaryBackground,
  },
  selected: {
    backgroundColor: Colors.secondary,
  },
  unselected: {
    backgroundColor: Colors.primaryBackground,
  },
});
