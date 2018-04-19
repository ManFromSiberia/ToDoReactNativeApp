import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  StatusBar,
  View, DrawerLayoutAndroid, ScrollView
} from 'react-native';

import Toolbar from './components/Toolbar'
import ToDoItem from "./components/ToDoItem";

type Props = {};
export default class App extends Component<Props> {
  state = {
    todos: [
      {
        title: "Hello"
      }, {
        title: "World"
      }
    ]
  };
  constructor (){
    super();
    this.openDrawer = this.openDrawer.bind(this)
    this.addNewPoint = this.addNewPoint.bind(this)
  }

  addNewPoint (){
    let title = "FBL>KSWHGJ";
    const newPoint = {title};
    this.setState({todos: [newPoint, ...this.state.todos]})
  }

  openDrawer (){
    this.refs.huinya.openDrawer();
  }

  render() {
    return (
        <DrawerLayoutAndroid ref={'huinya'}
                             renderNavigationView={() => (<View></View>)}
                             drawerPosition={DrawerLayoutAndroid.positions.Left}>
          <StatusBar translucent backgroundColor={"rgba(13,167,204, 0.5)"}/>
        <View style={styles.container}>
          <Toolbar shadow
                   rightOptions={[{icon: 'add', handler: this.addNewPoint}]}
                    leftOption={{icon: 'menu', handler: this.openDrawer}}/>

          <View style={styles.content}>
            {this.state.todos
              ?
              <ScrollView>
                {this.state.todos.map(element =>
                  <ToDoItem key={element} title={element.title}/>)}
              </ScrollView>
              :
              <View>
                <Text>No tasks</Text>
              </View>
            }
          </View>
        </View>
        </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 2,
    backgroundColor: '#ffffff',
  },
});
