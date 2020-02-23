import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  StyleSheet,
  Text,
} from 'react-native';

import {Employee} from '../types/employee';
import WageListItem from '../components/wage_list_item';
import WageListHeader from '../components/wage_list_header';

import {calculateMonthlyWage} from '../utils/wage_utils';

import {loadAndParseCSVFile} from '../utils/csv_utils';
import Strings from '../constant/strings';

const MainScreen = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    loadAndParseCSVFile('HourList201403.csv').then(data => {
      if (data != null) {
        setEmployees(data);
      }
    });
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>{Strings.monthlyWages}</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            keyExtractor={(_item, index) => index.toString()}
            data={employees}
            renderItem={({item}) => (
              <WageListItem
                id={item.id}
                name={item.name}
                monthlyWage={calculateMonthlyWage(item.shifts)}
              />
            )}
            ListHeaderComponent={<WageListHeader title={'March'} />}
            stickyHeaderIndices={[0]}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'black',
  },
  headerContainer: {
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default MainScreen;
