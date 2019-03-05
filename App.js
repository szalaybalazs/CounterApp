import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, requireNativeComponent, UIManager, findNodeHandle } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const CounterView = requireNativeComponent("CounterView");

const target = 5;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      winner: null
    }
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  update = e => {
    this.setState({
      count: e.nativeEvent.count
    })
  }

  handleWinner = winner => {
    this.setState({ winner })
    console.warn(winner)
  }

  updateNative = () => {
    console.log(this.counterRef)
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.counterRef),
      UIManager.getViewManagerConfig("CounterView").Commands.updateFromManager,
      [this.state.count]
    );
  }

  increment = () => {
    if(this.state.count == target - 1) this.handleWinner(1);
    this.setState({ count: this.state.count + 1})
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.winner == null ? (
          <View style={{width: '100%', height: '100%' }}>
            <TouchableOpacity onLongPress={this.updateNative} onPress={this.increment} style={{ flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center', elevation: 2}}>
              <Text style={{fontSize: 50, color: 'orange', textAlign: 'center', fontFamily: 'Noto Serif'}}>
                {this.state.count}
              </Text>
            </TouchableOpacity>
            <CounterView ref={e => this.counterRef = e} count={0} style={styles.wrapper} onUpdate={this.update} target={target} onWinner={() => this.handleWinner(2)} />
          </View>
        ) : (
          <View style={[styles.container, { width: '100%', height: '100%' }]}>
            <Text style={{ fontSize: 32, color: '#555' }}>The winner is: {this.state.winner == 1 ? 'React' : 'Swift'}</Text>
          </View>
        )}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
