import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

interface MainProps {}

const Main: React.FC<MainProps> = props => {
  const playerNames: Array<string> = ['Jiyoung', 'VA', 'Quinn', 'TA'];

  return (
    <View style={styles.container}>
      {playerNames.map(i => Item(i))}
      <Text>ok</Text>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Item = (name: string) => {
  <Card title={name}></Card>;
};
