import { Alert, TouchableOpacity, View } from "react-native"
import MyStyles from "../../styles/MyStyles"
import { TextInput } from "react-native"
import { useState } from "react"
import { useEffect } from "react"
import { Text } from "react-native"
import API, { authApi } from "../../configs/API"
import { endpoints } from "../../configs/API"
import { ScrollView } from "react-native-gesture-handler"
import { useContext } from "react"
import CartContext from "../../configs/CartContext"
import { Button } from "@rneui/themed"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Category = () => {
    const [cat, setCat]  = useState('')

    const handleCreateCategory = async ()  => {
        try {
            console.log(cat)
            let token = await AsyncStorage.getItem('access-token')
            let res = await authApi(token).post(endpoints["them-category"](cat)) 
            
            if (res.status===201) {
                Alert.alert("THêm thành công")
            }
            else  
                Alert.alert("Fail")
        } catch(ex) {
            console.log(ex)
        } finally {
            setCat('')
        }
    }
    return (
        <View>
            <TextInput value={cat} onChangeText={(t) => setCat(t)} style={{borderWidth: 2, backgroundColor: 'lightgray', padding: 10, marginBottom: 10}} placeholder="Nhap ten category"></TextInput>
            <Button onPress={handleCreateCategory} />
        </View>
    )
}

export default Category