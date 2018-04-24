import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, TouchableHighlight,
  TouchableNativeFeedback, Animated, Easing
} from 'react-native'
import Swipeable from 'react-native-swipeable'
import Icon from "react-native-vector-icons/MaterialIcons";

const {height, width} = Dimensions.get('window');
let showDescription = false;

export default class ToDoItem extends React.PureComponent {
  state = {
    showDescription: false
  };
  componentWillMount(){
    this.animatedValue = new Animated.Value(height*0.1);
  }

  heightAnimation(){
    let curHeight;
    //alert(this.animatedValue._value);
    if (this.animatedValue._value === height*0.3){
      curHeight = height*0.1;
      this.setState({showDescription: false})
    }else{
      curHeight = height*0.3;
      this.setState({showDescription: true})
    }
    Animated.timing(this.animatedValue, {
      toValue: curHeight,
      duration: 250,
      easing: Easing.ease
    }).start(()=> {
      showDescription = this.animatedValue._value === height * 0.3;
    })
  }

  _onPress(){
    this.heightAnimation();
  }

  render() {
    const animatedStyle = { height: this.animatedValue };
    const { title } = this.props;
    return (
      <Swipeable rightButtons={rightButtons}>
        <TouchableNativeFeedback onPress={() => this._onPress()}>
          <Animated.View style={[styles.item, animatedStyle]}>
            <Text>{title}</Text>
            {this.state.showDescription && <Text>Hello its test description</Text>}
          </Animated.View>
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
      elevation: 3
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
