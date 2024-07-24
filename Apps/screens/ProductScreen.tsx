import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRoute } from '@react-navigation/core';
import SkeletonLoader from '../components/SkeletonLaoder';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  farmerId: string;
  subcategoryId: string;
  farmerName: string;
  farmerImageUrl: string;
}

interface RouteParams {
  subcategoryId: string;
  name: string;
}

const ProductScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute();
  const params = route.params as RouteParams;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: productData, error: productError } = await supabase
          .from('Product')
          .select('*')
          .eq('subcategoryId', params.subcategoryId);

        if (productError) {
          throw new Error('Error fetching products');
        }

        const updatedProducts: Product[] = await Promise.all(
          productData.map(async (product) => {
            const { data: farmerData, error: farmerError } = await supabase
              .from('Farmer')
              .select('name, imageUrl')
              .eq('id', product.farmerId)
              .single();

            if (farmerError) {
              throw new Error('Error fetching farmer');
            }

            return {
              ...product,
              farmerName: farmerData?.name || 'Unknown Farmer',
              farmerImageUrl: farmerData?.imageUrl || 'Unknown'
            };
          })
        );

        setProducts(updatedProducts);
      } catch (error: any) {
        console.error('Error fetching products:', error.message);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.subcategoryId]);

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

  if (products.length === 0) {
    return (
      <View style={styles.noContainer}>
        <Image
          source={require('../../assets/no-grocery.png')}
          style={styles.noProductsImage}
        />
        <Text style={styles.noProductsText}>Sorry, none available in stock</Text>
      </View>
    );
  }

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://vhcydfkmdgzqvqzksnep.supabase.co/storage/v1/object/public/images/${item.imageUrl}` }}
        style={styles.productImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>GH₵{item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.quantity}>Quantity left: {item.quantity}</Text>
        <View style={styles.farmerContainer}>
          <Image
            source={{ uri: `https://vhcydfkmdgzqvqzksnep.supabase.co/storage/v1/object/public/images/${item.farmerImageUrl}` }}
            style={styles.farmerImage}
          />
          <Text style={styles.farmerName}>{item.farmerName}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: 'whitesmoke',
  },
  noContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    padding:2
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: 'purple',
    marginTop: 8,
  },
  quantity: {
    fontSize: 14,
    color: '#555',
  },
  farmerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  farmerImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 8,
  },
  farmerName: {
    fontSize: 14,
    color: '#555',
  },
  noProductsImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 16,
  },
  noProductsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
});

export default ProductScreen;
