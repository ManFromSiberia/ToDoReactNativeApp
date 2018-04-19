import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
const {width, height} = Dimensions.get('window');

export default class SearchableToolbar extends React.Component {

  render() {
    const { backHandler, placeholder, onTextChange, shadow } = this.props;
    return (
      <View style={[styles.container, {elevation: shadow ? 20 : 0}]}>
        <View style={styles.block}>
          <View style={styles.iconArea}>
            <TouchableOpacity onPress={backHandler}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Icon name="arrow-back" size={28} color="white"/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.titleArea}>
            <TextInput placeholder={placeholder}
                       placeholderTextColor="#94D5C6"
                       autoFocus
                       style={styles.input}
                       underlineColorAndroid="rgba(0,0,0,0)"
                       onChangeText={onTextChange}
                       ref="input"
            />
          </View>
        </View>
        <View style={styles.blockRight}>
          <TouchableOpacity style={styles.option} onPress={() => {
            this.refs.input.clear();
            onTextChange('');
          }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Icon name="close" size={28} color="white"/>
            </View>
          </TouchableOpacity>
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
    backgroundColor: '#1ca687',
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
    flex: 4,
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
  input: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto-Medium'
  }
});
