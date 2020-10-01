import React, {useEffect, useState} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import FadeIn from 'react-native-fade-in-image';
import Axios from 'axios';
import InfoPage from './components/InfoPage';
import ProgressCircle from 'react-native-progress-circle';

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
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            On {dateToStringFromObject()} in Romania we have
          </Text>
        </View>
        <FlatGrid
          itemDimension={130}
          data={items}
          style={{
            marginTop: 10,
            flex: 1,
          }}
          spacing={10}
          renderItem={({item}) => (
            <InfoPage dataCovid={dataCovid} item={item} />
          )}
        />
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Average age of cases
          </Text>
          <ProgressCircle
            percent={30}
            radius={67}
            borderWidth={15}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff">
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {dataCovid.currentDayStats.averageAge}
            </Text>
          </ProgressCircle>
        </View>
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
