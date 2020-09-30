import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import FadeIn from 'react-native-fade-in-image';
import Axios from 'axios';

export default function Example() {
  const [items, setItems] = React.useState([
    {name: 'INFECTED', code: '#FF0000', display: 'Total infected'},
    {name: 'CURED', code: '#2ecc71', display: 'Total cured'},
    {name: 'DEADS', code: '#000000', display: 'Total deads'},
  ]);

  const [preload, setPreload] = React.useState(3);
  const uri = 'https://douacadouri.ro/image/data/autocolante/stop_covid_19.png';
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [dataCovid, setDataCovid] = useState(null);
  const [error, setError] = useState(null);

  const dataCovidAmazon =
    'https://di5ds1eotmbx1.cloudfront.net/latestData.json';

  useEffect(() => {
    const timer = setTimeout(() => {
      Axios.get(dataCovidAmazon)
        .then((res) => {
          setDataCovid(res.data);
          setPreload(0);
        })
        .catch((err) => setError('Data not found'));
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const dateToStringFromObject = () => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    let output = day + '-' + month + '-' + year;
    return output + ' at ' + dateObj.toLocaleTimeString().toString();
  };

  if (preload === 0 && dataCovidAmazon !== null) {
    console.log(dataCovid.lasUpdatedOn);
    return (
      <>
        <View>
          <Text
            style={{
              fontSize: 20,
              textAlign:"center"
            }}>
            On {dateToStringFromObject()} in Romania we have
          </Text>
        </View>
        <FlatGrid
          itemDimension={130}
          data={items}
          style={styles.gridView}
          spacing={10}
          renderItem={({item}) => (
            <View style={[styles.itemContainer, {backgroundColor: item.code}]}>
              {item.name === 'INFECTED' ? (
                <Text style={styles.itemNumber}>
                  {dataCovid.currentDayStats.numberInfected}
                </Text>
              ) : null}
              {item.name === 'DEADS' ? (
                <Text style={styles.itemNumber}>
                  {dataCovid.currentDayStats.numberCured}
                </Text>
              ) : null}
              {item.name === 'CURED' ? (
                <Text style={styles.itemNumber}>
                  {dataCovid.currentDayStats.numberDeceased}
                </Text>
              ) : null}
              
              <Text style={styles.itemName}>{item.display}</Text>
            
            </View>
          )}
        />
      </>
    );
  } else {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: windowHeight * 0.2,
        }}>
        <Text>We're colecting data about SARS-COV-2</Text>
        <FadeIn>
          <Image
            source={{uri}}
            style={{
              width: windowWidth * 0.7,
              height: windowHeight / 2,
            }}
          />
        </FadeIn>
        <Text>{'\u00A9'} Chiperi Andrei</Text>
      </View>
    );
  }
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
