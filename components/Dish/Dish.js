import { TouchableOpacity, View } from "react-native"
import MyStyles from "../../styles/MyStyles"
import { TextInput } from "react-native"
import { useState } from "react"
import { useEffect } from "react"
import { Text } from "react-native"
import API from "../../configs/API"
import { endpoints } from "../../configs/API"
import { ScrollView } from "react-native-gesture-handler"
import { useContext } from "react"
import CartContext from "../../configs/CartContext"

const Dish = () => {
    const [nameKW, setNameKW] = useState('')
    const [shopKW, setShopKW] = useState('')
    const [catKW, setCatKw] = useState('')
    const [dishes, setDishes] = useState([])
    const [cartList, setCartList] = useContext(CartContext)

    useEffect(()=>{
        const loadDishes = async () => {
            try {
                let res = await API.get(endpoints['tim-kiem-dish'], {
                    params: {
                        name: nameKW,
                        shopName: shopKW,
                        catName: catKW
                    }
                });
                setDishes(res.data);
            } catch (ex) {
                setDishes([]);
                console.error(ex);
            }
        }

        loadDishes()
    }, [nameKW, shopKW, catKW])

    return (
        <View style={MyStyles.container}>
            <View style={{flex: 2}}>
                <TextInput value={nameKW} onChangeText={txt => setNameKW(txt)} placeholder="Enter name keyword"/>
                <TextInput value={shopKW} onChangeText={txt => setShopKW(txt)} placeholder="Enter shop keyword"/>
                <TextInput value={catKW} onChangeText={txt => setCatKw(txt)} placeholder="Enter cat keyword"/>
            </View>
            <View style={{flex: 5}}>
                <Text style={MyStyles.subject}>KẾT QUẢ</Text>
                <ScrollView>
                    {dishes.map((dish)=>(
                        <View key={dish.id}>
                            <View style={{flex: 1}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 20}}>
                                        Món: {dish?.Mon}
                                    </Text>
                                    <TouchableOpacity onPress={()=>{
                                            cartList.push(dish)
                                            setCartList(cartList)
                                        }} style={{borderWidth: 2, borderColor: 'chocolate'}}>
                                        <Text>Thêm vào giỏ</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{flex: 1}}>
                                <Text>Shop: {dish?.Shop}</Text>
                                <Text>Tình trạng: {dish?.TrangThai?'Còn': 'Hết'}</Text>
                            </View>
                        </View>
                    ))}

                </ScrollView>
            </View>
        </View>
    )
}

export default Dish