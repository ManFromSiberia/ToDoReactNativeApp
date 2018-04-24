import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const {height, width} = Dimensions.get('window');

export default class Toolbar extends React.Component {
  componentWillMount(){
    this.animatedValueRightElement = new Animated.Value(0);
  }

  onPressRightElement(handler) {
    this.animatedValueRightElement._value = 0;
    let curSpin = 1;
    Animated.timing(this.animatedValueRightElement, {
      toValue: curSpin,
      duration: 400
    }).start();
    handler ()
  }




  render() {
    const { title, leftOption, rightOptions, titleColor, optionColor, shadow, longName } = this.props;

    const spin = this.animatedValueRightElement.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    return (
        <View style={[styles.container, {elevation: shadow ? 15 : 0}]}>
          <View style={styles.block}>
            {!!leftOption &&  (
              <View style={styles.iconArea}>
                <TouchableOpacity onPress={leftOption.handler}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Icon name={leftOption.icon} size={leftOption.icon === "Close" ? 25 : 28} color="white"/>
                  </View>
                </TouchableOpacity>
              </View>

            )}
            <View style={[styles.titleArea, {flex: longName ? 6 : 5}]}>
              <Text style={[styles.title, {color: titleColor ? titleColor : 'white'}]}>{title}</Text>
            </View>

          </View>
          <View style={[styles.blockRight, {flex: longName ? 0 : 1}]}>
            {!!rightOptions && rightOptions.map(option => {
              return option.options ?
                <View><Text>erhgmrh</Text></View>
                :
                (
                  <TouchableOpacity key={option.title || option.icon} style={styles.option} onPress={() => this.onPressRightElement(option.handler)}>
                    <Animated.View style={{flex: 1, justifyContent: 'center', transform: [{rotate: spin }]}}>
                      {option.icon
                        ?
                        <Icon name={option.icon} size={28} color="white"/>
                        :
                        <Text style={[styles.optionText, {color: optionColor ? optionColor : 'white'}]}>
                          {option.title}
                        </Text>
                      }

                    </Animated.View>
                  </TouchableOpacity>
                )
            })}
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 15,
    backgroundColor: '#0d84a6',
  },
  title: {
    fontSize: 23,
    fontWeight: '400',
    fontFamily: "Roboto-Medium"
  },
  pickerContainer: {
    height: 65,
    width: 50,
    bottom: 10
  },
  block: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center'
  },
  iconArea: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  titleArea: {
    flex: 5,
  },
  blockRight: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  option: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 15,
    fontFamily: "Roboto-Regular"
  },
  dropdown: {
    margin: 10,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    width: 200,
    height: 300,
    borderRadius: 10,
  }
});
