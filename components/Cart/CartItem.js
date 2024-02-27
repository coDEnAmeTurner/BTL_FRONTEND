import React from 'react';
import { Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MyStyles from '../../styles/MyStyles';

const CartItem = ({dish, dishcounts}) => {
    
  return (
    <View style={MyStyles.container}>
        <Text style={{fontSize: 20}}>
            Món: {dish?.Mon}
        </Text>
        <Text>Shop: {dish?.Shop}</Text>
        <Text>Tình trạng: {dish?.TrangThai?'Còn': 'Hết'}</Text>
        <Text>Số lượng: {dishcounts[dish.id]}</Text>
    </View>
  )
}

export default CartItem;