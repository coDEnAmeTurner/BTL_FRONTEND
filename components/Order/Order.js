import { TextInput, View } from "react-native"
import { Text } from "react-native";
import API, { endpoints } from "../../configs/API";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import MyContext from "../../configs/MyContext";
import OrderContext from "../../configs/OrderContext";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Order = () => {
    const [orderList, setOrderList] = useContext(OrderContext)
    const [user, dispatch] = useContext(MyContext)
    const [loaiThanhToan, setLoaiThanhToan] = useState('CASH')
    const [orders, setOrders] = useState([])
    const dishList = orderList['dishList']
    const dishcounts = orderList['dishcounts']

    const createOrder = async (ShopId) => {
        let shopDishList = []
        dishList.map(dish => {
            if (dish.ShopId==ShopId) {
                obj = {
                    id: dish.id,
                    soLuong: dishcounts[dish.id]
                }
                shopDishList.push(obj)
            }
        })

        try {
            let res = await API.post(endpoints['create-orders'](loaiThanhToan, shopDishList, ShopId))

            console.log(endpoints['create-orders'](loaiThanhToan, shopDishList, ShopId))

            orders.push(res.data)
            setOrders(orders)
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <View>
            <TextInput value={loaiThanhToan} onChangeText={txt => setLoaiThanhToan(txt)} placeholder="Loại thanh toán"/>
            <Button 
                title="Tạo"
                onPress={async () => {
                    let token = await AsyncStorage.getItem('access-token')
                    console.log(token)
                    let shopIdList = dishList.map(dish=>dish.ShopId)
                    uniqshopIdList = [...new Set(shopIdList)];
                    uniqshopIdList.map(shopId=>createOrder(shopId))
                }
                } 
            />
            {orders.map(order => <View>
                {order}
            </View>)}
        </View>
    )
}

export default Order;