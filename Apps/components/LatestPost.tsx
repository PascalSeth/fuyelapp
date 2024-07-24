import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import SkeletonLoader from './SkeletonLaoder';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  categoryId: string;
  farmerId: string;
  category: string;
  farmer: string;
  farmerImageUrl: string;
}

const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    imageUrl: 'https://example.com/images/spaghetti_carbonara.jpg',
    price: '25.00',
    categoryId: '1',
    farmerId: '1',
    category: 'Main Courses',
    farmer: 'Farm Fresh',
    farmerImageUrl: 'https://example.com/images/farm_fresh.jpg',
  },
  {
    id: '2',
    name: 'Caesar Salad',
    imageUrl: 'https://example.com/images/caesar_salad.jpg',
    price: '15.00',
    categoryId: '2',
    farmerId: '2',
    category: 'Appetizers',
    farmer: 'Green Fields',
    farmerImageUrl: 'https://example.com/images/green_fields.jpg',
  },
  {
    id: '3',
    name: 'Chocolate Cake',
    imageUrl: 'https://example.com/images/chocolate_cake.jpg',
    price: '10.00',
    categoryId: '3',
    farmerId: '3',
    category: 'Desserts',
    farmer: 'Sweet Treats',
    farmerImageUrl: 'https://example.com/images/sweet_treats.jpg',
  },
  {
    id: '4',
    name: 'Lemonade',
    imageUrl: 'https://example.com/images/lemonade.jpg',
    price: '5.00',
    categoryId: '4',
    farmerId: '4',
    category: 'Beverages',
    farmer: 'Cool Drinks',
    farmerImageUrl: 'https://example.com/images/cool_drinks.jpg',
  },
];

const Dishes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, 1000); // Simulate a delay
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <SkeletonLoader />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Posts</Text>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
            <View style={styles.textContainer}>
              <Text style={styles.postTitle}>{item.name}</Text>
              <Text style={styles.postPrice}>GH₵{item.price}</Text>
            </View>
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.postCategory}>{item.category}</Text>
              </View>
              <View style={styles.farmerContainer}>
                <Image source={{ uri: item.farmerImageUrl }} style={styles.farmerImage} />
                <Text style={styles.postCompany}>{item.farmer}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  postImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postPrice: {
    fontSize: 14,
    color: 'purple',
  },
  postCategory: {
    fontSize: 8,
    height: 'auto',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  postCompany: {
    fontSize: 9,
    marginLeft: 5,
    color: '#555',
  },
  farmerImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  farmerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Dishes;
