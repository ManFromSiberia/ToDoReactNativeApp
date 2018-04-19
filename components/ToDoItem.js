import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'


const {height, width} = Dimensions.get('window');

export default class ToDoItem extends React.PureComponent {

  render() {
    const { title } = this.props;

    return (
      <View style={styles.item}>
        <Text>{title}</Text>
      </View>
    )

  }

}

const styles = StyleSheet.create({
    item:{
      flex: 1,
      backgroundColor: 'green',
      height: height*0.1,
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,
      justifyContent: 'center',
    },
  }
);