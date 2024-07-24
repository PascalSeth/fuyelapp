import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import SkeletonLoader from './SkeletonLaoder';

type Props = {}

interface SliderImage {
  id: string;
  imageUrl: string;
}

const dummyImage: SliderImage = { 
  id: '1', 
  imageUrl: 'https://example.com/images/dummy_image.jpg' 
};

const Slider = (props: Props) => {
  const [image, setImage] = useState<SliderImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setImage(dummyImage);
      setLoading(false);
    }, 1000); // Simulate a delay
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <SkeletonLoader />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        {error}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {image && (
        <Image 
          source={{ uri: image.imageUrl }} 
          style={styles.image} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Slider;
