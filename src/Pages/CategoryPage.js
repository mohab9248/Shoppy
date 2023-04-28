import {View, FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {useEffect, useState} from 'react';
import ProductThumbnail from '../Components/ProductThumbnail';
import CategorySideBar from '../Components/CategorySideBar';

const PRODUCTS_ENDPOINT = ' https://api.escuelajs.co/api/v1/categories/';
const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const Products_axios = async () => {
    // setLoading(true);
    const products = await axios({
      url: PRODUCTS_ENDPOINT + selectedCategory + '/products',
      method: 'get',
    });
    const cats = await axios({
      url: 'https://api.escuelajs.co/api/v1/categories',
      method: 'get',
    });

    setProducts(products.data);

    setCategories(cats.data);
    setLoading(false);
  };
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log(categories);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Products_axios();
  }, [selectedCategory]);
  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#353b48',
      }}>
      <CategorySideBar
        categories={categories}
        changeSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <FlatList
        style={{width: 140}}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: '#353b48',
        }}
        data={products}
        renderItem={({item, index}) => (
          <ProductThumbnail
            containerStyle={{
              width: 100,
              height: 160,
              margin: 5,
              flex: 1,
              padding: 2.5,
              borderRadius: 5,
              backgroundColor: '#bdc3c7',
            }}
            imageStyle={{width: '100%'}}
            item={item}
            index={index - 1}
          />
        )}
      />
    </View>
  );
};

export default CategoryPage;
0;
