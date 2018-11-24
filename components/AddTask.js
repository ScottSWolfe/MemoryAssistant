import React, { Component } from 'react';
import { TextInput, TouchableOpacity, CheckBox } from 'react-native';
import { View, Body } from 'native-base';

import { TrashIcon } from '../components/Icons';


const defaultProps = {
  task: {
    title: '',
    completed: false,
    time_created: 0,
  },
};

class AddTask extends Component {
  constructor(props) {
    super(props);
    const { title, completed, time_created } = this.props.task;
    this.state = {
      title,
      completed,
      time_created,
    };
  }

  onSubmit = () => {
    if (this.state.title.length > 0) this.props.onAdd(this.state);
    return null;
  };

  setStateUtil = (property, value = undefined) => {
    this.setState({
      [property]: value,
    });
  };

  render() {
    const { title, completed } = this.state;
    const { onBlur } = this.props;
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: 10,
          paddingBottom: 5,
          paddingTop: 5,
        }}
      >
        <CheckBox checked={completed} onPress={() => this.setStateUtil('completed', !completed)} />
        <Body
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingLeft: 25,
          }}
        >
          <TextInput
            style={{ width: '90%' }}
            placeholder="What needs to be done?"
            autoFocus
            underLineColorAndroid="transparent"
            underlineColor="transparent"
            blurOnSubmit
            onSubmitEditing={this.onSubmit}
            onChangeText={changedTitle => this.setStateUtil('title', changedTitle)}
            value={title}
            autoCorrect={false}
            autoCapitalize="sentences"
            onBlur={onBlur}
            fontSize={26}
          />
        </Body>
        <TouchableOpacity
          onPress={() => this.props.onCancelDelete}
          style={{ paddingLeft: 25, paddingRight: 15 }}
        >
          <TrashIcon/>
        </TouchableOpacity>
      </View>
    );
  }
}

AddTask.defaultProps = defaultProps;

export default AddTask;
