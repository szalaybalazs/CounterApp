/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, requireNativeComponent, UIManager, findNodeHandle } from 'react-native';

const CounterView = requireNativeComponent("CounterView");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  update = e => {
    this.setState({
      count: e.nativeEvent.count
    })
  }

  updateNative = () => {
    console.log(this.counterRef)
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.counterRef),                     // 1
      UIManager.getViewManagerConfig("CounterView").Commands.updateFromManager, // 2
      [this.state.count]                                   // 3
    );
  }

  increment = () => this.setState({ count: this.state.count + 1})

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onLongPress={this.updateNative} onPress={this.increment} style={{ flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center', elevation: 2}}>
          <Text style={{fontSize: 50, color: 'orange', textAlign: 'center'}}>
            {this.state.count}
          </Text>
        </TouchableOpacity>
        <CounterView ref={e => this.counterRef = e} count={0} style={styles.wrapper} onUpdate={this.update} />
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
