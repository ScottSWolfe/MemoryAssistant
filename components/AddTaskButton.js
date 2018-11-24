import React from 'react';
import { Icon, Fab } from 'native-base';


export default class AddTaskButton extends React.Component {
  render() {
    return (
      <Fab
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: this.props.color }}
        position="bottomRight"
        onPress={this.props.onPress}
      >
        <Icon name="add" />
      </Fab>
    );
  }
};
