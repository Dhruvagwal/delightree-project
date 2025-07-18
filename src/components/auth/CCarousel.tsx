import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const AuthCaoursel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const carouselItems = [
    { title: 'Item 1', text: 'Text 1' },
    { title: 'Item 2', text: 'Text 2' },
    { title: 'Item 3', text: 'Text 3' },
    { title: 'Item 4', text: 'Text 4' },
    { title: 'Item 5', text: 'Text 5' },
  ];

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        layout="default"
        ref={carouselRef}
        data={carouselItems}
        sliderWidth={300}
        itemWidth={300}
        renderItem={renderItem}
        onSnapToItem={index => setActiveIndex(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  itemContainer: {
    borderRadius: 5,
    height: 250,
    padding: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  itemTitle: {
    fontSize: 30,
  },
});

export default AuthCaoursel;
