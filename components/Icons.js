import React from 'react';
import { Icon } from 'react-native-elements';


class TrashIcon extends React.Component {
  render() {
    return (
      <Icon
        name='trash'
        type='evilicon'
        color='black'
      />
    );
  }
}

export { TrashIcon };
