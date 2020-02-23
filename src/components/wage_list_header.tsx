import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  title: string;
}

const WageListHeader: React.FC<Props> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'blue',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WageListHeader;
