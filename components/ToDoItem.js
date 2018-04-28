import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing
} from 'react-native'
import Swipeable from 'react-native-swipeable'
import Icon from "react-native-vector-icons/MaterialIcons";

const {height, width} = Dimensions.get('window');

export default class ToDoItem extends React.PureComponent {
  state = {
    showDescription: false
  };
  componentWillMount(){
    this.animatedValue = new Animated.Value(height*0.1);
  }

  heightAnimation(){
    let curHeight;
    if (this.animatedValue._value === height*0.15){
      curHeight = height*0.1;
      this.setState({showDescription: false})
    }else{
      curHeight = height*0.15;
      this.setState({showDescription: true})
    }
    Animated.timing(this.animatedValue, {
      toValue: curHeight,
      duration: 250,
      easing: Easing.ease
    }).start()
  }

  _onPress(){
    this.heightAnimation();
  }

  swipeable = null;

  resetToInitialView() {
    this.swipeable.recenter();
  }

  render() {
    const animatedStyle = { height: this.animatedValue };
    const { title, description, id, complete } = this.props;

    return (
      <Swipeable onRef={ref => this.swipeable = ref}
        leftActionActivationDistance={125}
                 leftContent={(
                   <View style={[styles.leftSwipeItem]}>
                     {complete ?
                       <Icon name={'done'} size={40} color="green"/> :
                       <Icon name={'clear'} size={40} color="red"/>}
                   </View>
                                )}
                 onLeftActionActivate={() => {this.props.updateItem(id, 'COMPLETE')}}
                 rightButtons={[
          <TouchableOpacity style={styles.button} onPress={() => {this.props.updateItem(id, 'DELETE'); this.resetToInitialView()}}><Icon name={'delete'} size={40} color="red"/></TouchableOpacity>
        ]}>
        <TouchableOpacity onPress={() => this._onPress()} activeOpacity={0.7}>
          <Animated.View style={[styles.item, animatedStyle]}>
            <Text>{complete? "✔":""}{title}</Text>
            {
              this.state.showDescription &&
              <Text>{description}</Text>
            }
          </Animated.View>
        </TouchableOpacity>
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
      marginVertical: 2,
      justifyContent: 'center',
    },
    button:{
      flex: 1,
      width: '10%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  leftSwipeItem: {
    flex: 1,
    height: height*0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  }
);
