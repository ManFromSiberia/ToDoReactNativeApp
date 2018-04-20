import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native'
import Swipeable from 'react-native-swipeable'
import Icon from "react-native-vector-icons/MaterialIcons";

const {height, width} = Dimensions.get('window');


export default class ToDoItem extends React.PureComponent {
  render() {
    const { title } = this.props;
    return (
      <Swipeable rightButtons={rightButtons}>
        <TouchableNativeFeedback>
          <View style={styles.item}>
            <Text>{title}</Text>
          </View>
        </TouchableNativeFeedback>
      </Swipeable>
    )

  }

}

const styles = StyleSheet.create({
    item:{
      flex: 1,
      backgroundColor: '#f4f4f4',
      height: height*0.1,
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,
      justifyContent: 'center',
      borderRadius: 5,
    },
    button:{
      flex: 1,
      width: '10%',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }
);

const rightButtons = [
  <TouchableOpacity style={styles.button}><Icon name={'delete'} size={40} color="red"/></TouchableOpacity>
];
