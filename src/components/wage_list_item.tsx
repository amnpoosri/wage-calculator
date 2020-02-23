import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface WageItem {
  id: string;
  name: string;
  monthlyWage: number;
}

const WageListItem: React.FC<WageItem> = ({id, name, monthlyWage}) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text>{id} </Text>
        <Text>{name}</Text>
      </View>
      <Text>${monthlyWage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    shadowOpacity: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderRadius: 4,
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'row',
  },
});

export default WageListItem;
