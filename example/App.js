/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import StaggeredList from '@mindinventory/react-native-stagger-view';

const App = () => {
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const [imageURL, setImageURL] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);
      fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1')
        .then(res => res.json())
        .then(resJson => {
          setImageURL([...resJson]);
          setIsLoading(false);
        })
        .catch(e => {
          console.log(e);
          setIsLoading(false);
        });
    };

    fetchImages();
  }, []);

  const getChildrenStyle = () => {
    return {
      width: (SCREEN_WIDTH - 18) / 2,
      height: Number(Math.random() * 20 + 12) * 10,
      backgroundColor: 'gray',
      margin: 4,
      borderRadius: 18,
    };
  };

  const renderChildren = item => {
    return (
      <View style={getChildrenStyle()} key={item.id}>
        <View style={styles.avatarImage}>
          <Image
            onError={() => {}}
            style={styles.img}
            source={{
              uri: item.url,
            }}
            resizeMode={'cover'}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapperView}>
        <StaggeredList
          data={imageURL}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => renderChildren(item)}
          loading={isLoading}
          LoadingView={
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator color={'white'} size={'large'} />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'gray',
  },
  mainWrapperView: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 20,
  },
  activityIndicatorWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 0,
    alignSelf: 'stretch',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  avatarImage: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 18,
  },
});

export default App;
