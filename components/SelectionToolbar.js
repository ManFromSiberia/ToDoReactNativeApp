import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class SelectionToolbar extends React.Component {

  render() {
    const { allHandler, allToggle, title, count, options, shadow } = this.props;
    return (
      <View style={[styles.container, {elevation: shadow ? 20 : 0}]}>
        <View style={styles.iconArea}>
          <TouchableOpacity onPress={allHandler}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {allToggle ?
                <Icon name="check-box" size={28} color="white"/>
                :
                <Icon name="check-box-outline-blank" size={28} color="white"/>
              }
              <Text style={{fontSize: 13, color: 'white'}}>Alle</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.titleArea, {flex: count ? 2 : 7}]}>
          <Text style={styles.title}>{count ? count : title}</Text>
        </View>
        <View style={[styles.blockRight, {flex: count ? 7 : 2}]}>
          {!!count && !!options && options.map(option => {
              return (
                <TouchableOpacity key={option.title} style={styles.option} onPress={option.handler}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    {option.icon
                      ?
                      <Icon name={option.icon} size={28} color="white"/>
                      :
                      <Text style={styles.optionText}>
                        {option.title}
                      </Text>
                    }
                  </View>
                </TouchableOpacity>
              )})}
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
    paddingLeft: 10,
    backgroundColor: '#1ca687',
  },
  title: {
    color: 'white',
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
    marginRight: 15,
    marginLeft: 5,
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
    fontFamily: "Roboto-Regular",
    color: 'white'
  },
  input: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto-Medium'
  }
});
