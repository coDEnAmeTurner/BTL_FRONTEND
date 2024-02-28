import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import API, { authApi } from "../../configs/API"
import { endpoints } from "../../configs/API"

const Menu = () => {

  const [name, setName] = useState('');  
  const [dishes, setDishes] = useState([]);

  const handleSubmit = async () => {
    try {  
      let token = await AsyncStorage.getItem('access-token');

      const data = {
        name,
        dishes  
      };

      let response = await authApi(token).post(endpoints['them-menu'], data);

      if(response.status === 201) {
        Alert.alert("THêm thành công")
      } else {
        Alert.alert("Fail")
      }

    } catch (err) {
        console.log(err)  
    }
  }
  return (
    <View>

      <TextInput
        value={name}
        onChangeText={setName}  
      />

      <Button
        title="Chọn món"
        onPress={handleSelectDish}  
      />

      {isSelectingDish && 
        <FlatList
          data={dishes}
          renderItem={({item}) => (
            <DishItem 
              dish={item}
              onPress={() => handleDishSelected(item)} 
            />
          )}
        />  
      }

      <Button
        title="Submit"
        onPress={handleSubmit}
      />

    </View>
  )

}
export default Menu
