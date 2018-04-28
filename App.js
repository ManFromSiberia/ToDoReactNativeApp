import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View, ScrollView, AsyncStorage, Modal, Dimensions, ToastAndroid, Switch
} from 'react-native';
import Toolbar from './components/Toolbar'
import ToDoItem from "./components/ToDoItem";
import { setCustomText } from 'react-native-global-props';
import { TextField } from 'react-native-material-textfield';
import { RaisedTextButton } from 'react-native-material-buttons';
import PushNotification from 'react-native-push-notification';
import DateTimePicker from 'react-native-modal-datetime-picker';

const customTextProps = {
  style: {
    fontFamily: 'Roboto-Regular'
  }
};
setCustomText(customTextProps);
const {height, width} = Dimensions.get('window');
type Props = {};
export default class App extends Component<Props> {
  state = {
    todos: [],
    modalVisible: false,
    isDateTimePickerVisible: false,
    sendNotification: false,
    notificationDate: undefined
  };

  constructor (){
    super();
    this.addNewPoint = this.addNewPoint.bind(this);
  }

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

  static generateId(){
    let token = '';
    const possible = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
    const count = possible.length - 1;
    let position;
    for( let i = 0; i < 30; i++ ) {
      position = Math.round(Math.random() * count);
      token += possible.charAt(position);
    }
    return token;
  }

  clearAllState = () => {
    this.setState({title:'', description: '', sendNotification: false, notificationDate: undefined});
  };

  addNewPoint (inputTitle, inputDescription) {
    let title = inputTitle;
    let description = inputDescription;
    let id = App.generateId();
    let complete = false;
    let dateNotification = this.state.notificationDate;

    const newPoint = {title, description, id, complete, dateNotification};
    this.setName(newPoint).then(()=>{
      this.setState({todos: [newPoint, ...this.state.todos]});
      this.setState({modalVisible: false});
      ToastAndroid.show('Successful created new task!', ToastAndroid.SHORT);
      this.clearAllState();
      App.createNotificationSchedule(title, dateNotification)
    }).catch(err => {
      alert(err)
    });
  }

  static createNotificationSchedule(title, date){
    PushNotification.localNotificationSchedule({
      title: "You complete this task?",
      message: title,
      date: new Date(date)
    });
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => {
    if (this.state.notificationDate === undefined){
      this.setState({sendNotification: false})
    }
    this.setState({ isDateTimePickerVisible: false });
  };

  _handleDatePicked = (date) => {
    this.setState({notificationDate: new Date(date)});
    this._hideDateTimePicker();
  };

  updateItem = (value, action) => {
    this.state.todos.map(element =>{
      if (element.id === value){
        let count = this.state.todos.indexOf(element);
        if (action === 'COMPLETE'){
          let buff = this.state.todos;
          buff[count].complete = !buff[count].complete;
          if(buff[count].complete){
            PushNotification.cancelLocalNotifications({message: buff[count].title});
          }
          this.setState({todos: buff});
          AsyncStorage.setItem('todos', JSON.stringify(this.state.todos));
        }else if(action === 'DELETE'){
          let buff = this.state.todos;
          PushNotification.cancelLocalNotifications({message: buff[count].title});
          buff.splice(count,1);
          this.setState({todos: buff});
          AsyncStorage.setItem('todos', JSON.stringify(this.state.todos));
        }
      }
    })
  };

  render() {
    let { title } = this.state;
    let { description } = this.state;
    return (
        <View style={styles.container}>
          <StatusBar translucent backgroundColor={"#0d7b9c"}/>

          <Modal  transparent={true}
                  visible={this.state.modalVisible}
                  animationType={"fade"}
                  onRequestClose={()=>this.setState({modalVisible: false})}>
            <View style={styles.modalForm}>

              <View style={styles.form}>
                  <View style={{width: width*0.6}}>
                    <TextField
                      label='Title'
                      value={title}
                      onChangeText={ (title) => this.setState({ title }) }
                    />
                    <TextField
                      label='Description'
                      value={description}
                      multiline={true}
                      onChangeText={ (description) => this.setState({ description }) }
                    />
                    <View style={styles.notificationInput}>
                      <Text style={{top:2}}>Send notification</Text>
                      <Switch
                        onValueChange={(sendNotification) => {this.setState({sendNotification});
                          sendNotification ? this._showDateTimePicker(): 0 }}
                        value={this.state.sendNotification}/>
                    </View>
                      {this.state.notificationDate &&
                      <Text>{this.state.notificationDate.toLocaleString()}</Text>}
                  </View>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode={'datetime'}
                />
                <View style={styles.modalButtons}>
                  <RaisedTextButton
                    title='Cancel'
                    color='#cd201f'
                    titleColor='#ffffff'
                    onPress={()=>{this.setState({modalVisible: false})}}/>
                  <RaisedTextButton
                    title='Create'
                    titleColor='#ffffff'
                    color='rgb(0, 145, 234)'
                    onPress={()=> {this.addNewPoint(title, description)}}/>
                </View>
              </View>


            </View>
          </Modal>

          <Toolbar shadow
                   rightOptions={[{icon: 'add', handler:()=> {this.setState({modalVisible: true})}}]}/>
          <View style={styles.content}>
            {this.state.todos
              ?
              <ScrollView>
                {this.state.todos.map(element =>
                  <ToDoItem key={element}
                            updateItem={this.updateItem}
                            id={element.id}
                            title={element.title}
                            description={element.description}
                            complete={element.complete}/>)}
              </ScrollView>
              :
              <View>
                <Text>No tasks</Text>
              </View>
            }
          </View>
        </View>
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
  modalForm:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10
  },
  form:{
    backgroundColor: '#ffffff',
    height: height*0.4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#ffffff',
    alignContent: 'center'
  },
  submitModalFormButton:{
    backgroundColor: '#0077b5',
    height: height*0.05,
    width: width*0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtons:{
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  notificationInput:{
    flexDirection: 'row',
    alignContent: 'center',
    marginVertical: 5,
    justifyContent: 'space-between'
  },

});
