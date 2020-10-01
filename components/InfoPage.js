import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {CountUp} from 'use-count-up';

export default function InfoPage({dataCovid, item}) {
  return (
    <View style={[styles.itemContainer, {backgroundColor: item.code}]}>
      {item.name === 'INFECTED' ? (
        <Text style={styles.itemNumber}>
          <CountUp
            isCounting
            end={dataCovid.currentDayStats.numberInfected}
            duration={2}
          />
        </Text>
      ) : null}
      {item.name === 'DEADS' ? (
        <Text style={styles.itemNumber}>
          <CountUp
            isCounting
            end={dataCovid.currentDayStats.numberDeceased}
            duration={2}
          />
        </Text>
      ) : null}
      {item.name === 'CURED' ? (
        <Text style={styles.itemNumber}>
          <CountUp
            isCounting
            end={dataCovid.currentDayStats.numberCured}
            duration={2}
          />
        </Text>
      ) : null}

      <Text style={styles.itemName}>{item.display}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    height: 150,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  itemNumber: {
    fontWeight: '600',
    fontSize: 40,
    color: 'white',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});
