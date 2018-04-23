import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  StatusBar,
  View, DrawerLayoutAndroid, ScrollView, AsyncStorage, TouchableHighlight, Animated
} from 'react-native';

import Toolbar from './components/Toolbar'
import ToDoItem from "./components/ToDoItem";
import ModalForm from './components/InputFormModal'

type Props = {};
export default class App extends Component<Props> {
  state = {
    todos: []
  };

  constructor (){
    super();
    this.openDrawer = this.openDrawer.bind(this);
    this.addNewPoint = this.addNewPoint.bind(this);
  }
  //clear = AsyncStorage.clear();
  componentDidMount = async () => await AsyncStorage.getItem('todos').then((value)=>{
    this.setState({ todos: JSON.parse([value]) })
  });


  setName = async (title) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify([title, ...this.state.todos]));
    } catch (err) {
      console.log("Не записалось");
    }
  };

  addNewPoint () {
    let title = "title";
    const newPoint = {title};
    this.setName(newPoint).then(()=>{
      this.setState({todos: [newPoint, ...this.state.todos]});
    }).catch(err => {
      alert(err)
    });
  }

  openDrawer (){
    this.refs.leftMenu.openDrawer();
  }

  render() {
    return (
        <DrawerLayoutAndroid ref={'leftMenu'}
                             renderNavigationView={() => (<View>

                             </View>)}
                             drawerPosition={DrawerLayoutAndroid.positions.Left}>
          <StatusBar translucent backgroundColor={"#0d7b9c"}/>
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

let token = '';
const possible = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
const count = possible.length - 1;
let position;
for( let i = 0; i < 30; i++ ) {
  position = Math.round(Math.random() * count);
  token += possible.charAt(position);
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
