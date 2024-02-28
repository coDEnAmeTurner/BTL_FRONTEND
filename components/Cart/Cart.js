import { useContext } from "react"
import { View } from "react-native"
import MyContext from "../../configs/MyContext"
import { useEffect } from "react"
import MyStyles from "../../styles/MyStyles"
import CartContext from "../../configs/CartContext"
import OrderContext from "../../configs/OrderContext"
import CartItem from "./CartItem"
import { Button } from "react-native"
import { Text } from "react-native"
import Order from "../Order/Order"

const Cart = ({navigation}) => {
    const [cartList, setCartList] = useContext(CartContext)
    const [orderList, setOrderList] = useContext(OrderContext)
    const dishcounts = {};

    const renderCartList = () => {
        cartList.map(dish => dishcounts[dish.id] = dishcounts[dish.id] ? dishcounts[dish.id] + 1 : 1)
        return cartList.map(item => <CartItem key={item?.id} dish={item} dishcounts={dishcounts}/>)
    }

    return (
        <View style={MyStyles.container}>
            {/* Cart Items List */}
            {cartList.length > 0 ? renderCartList() : 
                <Text>Chưa có món nào trong đơn</Text>  
            }

            {/* Checkout Button */}
            <Button 
                title="Đặt hàng"
                onPress={() => {
                    setOrderList({
                        'cartList': cartList,
                        'dishcounts': dishcounts
                    })
                    navigation.navigate('Order')
                }} 
            />


        </View>
    )

}

export default Cart
