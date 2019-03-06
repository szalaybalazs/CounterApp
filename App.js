import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, requireNativeComponent, UIManager, findNodeHandle } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Counter from './Counter';
import { createStackNavigator, createAppContainer } from "react-navigation";
import List from './List';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => SplashScreen.hide();

  render() {
    return (
      <View style={[styles.container, { justifyContent: 'flex-start'}]}>
        <Text style={{
          fontSize: 24,
          color: '#555',
          margin: 42,
        }}>Counter app - Home</Text>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Counter')}>
          <Text style={{
            padding: 12,
            color: '#333',
            fontSize: 18
          }}>Start Counting!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('List')}>
          <Text style={{
            padding: 12,
            color: '#333',
            fontSize: 18
          }}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: { 
    screen: App,
    navigationOptions: {
      title: 'HOME'
    }
  },
  List: { 
    screen: List,
    navigationOptions: {
      title: 'Leaderboard'
    }
  },
  Counter: { 
    screen: Counter,
    navigationOptions: {
      header: null
    }
  },
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',
    height: '100%'
  },
  wrapper: {
    flex: 1, alignItems: "center", justifyContent: "center",
    backgroundColor: '#ddd',
    width: '100%'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
