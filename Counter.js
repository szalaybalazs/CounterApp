import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, requireNativeComponent, UIManager, findNodeHandle } from 'react-native';
const CounterView = requireNativeComponent("CounterView");

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      winner: null,
      qod: null
    }
  }

  static defaultProps = { target: 25 }

  //Handling quote fetch
  componentDidMount = () => {
    fetch('http://quotes.rest/qod').then(res => res.json())
    .then(res => {
      this.setState({ qod: res.contents.quotes[0]})
    })
  }

  //Handing update from native element
  update = e => this.setState({ count: e.nativeEvent.count })

  //Handling winner
  handleWinner = winner => this.setState({ winner })

  updateNative = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.counterRef),
      UIManager.getViewManagerConfig("CounterView").Commands.updateFromManager,
      [this.state.count]
    );
  }

  increment = () => {
    if(this.state.count == this.props.target - 1) this.handleWinner(1);
    this.setState({ count: this.state.count + 1})
  }

  render() {
    const target = this.props.target;
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
            {this.state.qod && (
              <View>
                <Text style={{ textAlign: 'center', fontSize: 24, marginTop: 18, marginBottom: 8, color: '#333' }}>Quote of the day:</Text>
                <Text style={{ fontSize: 18, color: '#555', paddingLeft: 12, paddingRight: 12 }}>{this.state.qod.quote}</Text>
                <Text style={{ fontSize: 18, color: '#555', paddingLeft: 12, paddingRight: 12, textAlign: 'right' }}>{this.state.qod.author}</Text>
              </View>
            )}
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
    width: '100%'
  },
  wrapper: {
    flex: 1, alignItems: "center", justifyContent: "center",
    backgroundColor: '#ddd',
    width: '100%',
    height: '100%'
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