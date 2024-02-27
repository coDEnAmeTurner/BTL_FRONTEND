import { useContext } from "react"
import { View } from "react-native"
import MyContext from "../../configs/MyContext"
import { useEffect } from "react"
import MyStyles from "../../styles/MyStyles"
import CartContext from "../../configs/CartContext"
import CartItem from "./CartItem"
import { Button } from "react-native"
import { Text } from "react-native"

const Cart = () => {
    const [cartList, setCartList] = useContext(CartContext)
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
                    
                }} 
            />


        </View>
    )

}

export default Cart
