import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

export default class List extends Component {
  state = {
    content: [
      { key: 'a' },
      { key: 'b' },
      { key: 'c' },
      { key: 'd' },
      { key: 'e' },
      { key: 'f' },
      { key: 'g' },
      { key: 'h' },
      { key: 'i' },
      { key: 'j' },
      { key: 'k' },
      { key: 'l' },
      { key: 'm' },
    ]
  }

  handleEnd = ({ distanceFromEnd }) => {
    const content = this.state.content;
    for(let i = 0; i < 25; i++) content.push({ key: String(i * Math.random()) });
    this.setState({ content })
  }

  renderItem = item => {
    return <ListItem key={item.index} item={item} />
  }

  render() {
    return (
      <View style={{width: '100%', flex: 1}}>
        <Text>Leaderboard</Text>
        <View>
        <FlatList
          style={{ width: '100%', height: 420, backgroundColor: '#ccc', marginTop: 80 }}
          data={this.state.content}
          renderItem={this.renderItem}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={.12}
          numColumns={2}
        />
        </View>
      </View>
    )
  }
}

const ListItem = ({ item }) => {
  return (
    <Text style={{ backgroundColor: '#ddd', margin: 6, flex: 1, padding: 12, fontSize: 16}}>{item.item.key}</Text>
  )
}