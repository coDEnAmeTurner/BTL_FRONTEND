import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import SignInScreen from "./components/User/SignInScreen";
import SignUpScreen from "./components/User/SignUpScreen";
import React, { useContext, useReducer } from 'react'
import MyContext from "./configs/MyContext";
import MyUserReducer from "./reducers/MyUserReducer";
import Dish from "./components/Dish/Dish"
import CartContext from "./configs/CartContext";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";

const Drawer = createDrawerNavigator();

const App = () => {
  const [cartList, setCartList] = useState([]);
  const [user, dispatch] = useReducer(MyUserReducer, {username: 'GUEST'});

  return (
    <CartContext.Provider value={[cartList, setCartList] }>
      <MyContext.Provider value={[user, dispatch]}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName='Home'>
            {user.username==='GUEST'?<>
              <Drawer.Screen name="SignInScreen" component={SignInScreen} />
              <Drawer.Screen name="SignUpScreen" component={SignUpScreen} />
            </>:<>
                <Drawer.Screen name="Dish" component={Dish} />
                <Drawer.Screen name="Cart" component={Cart} />
                <Drawer.Screen name="Order" component={Order} />
            </>}
          </Drawer.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </CartContext.Provider>

  )
}


export default App;