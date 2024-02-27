import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import Style from "./Style";
import React, { useEffect, useState } from "react";
import API, { endpoints } from "../../configs/API";
import MyStyles from "../../styles/MyStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

const Home = ({route, navigation}) => {
    const [shops, setShops] = React.useState([]);

    React.useEffect(() => {
        const loadShops = async () => {
            try {
                let res = await API.get(endpoints['list-shop']);
                setShops(res.data);
            } catch (ex) {
                setShops([]);
                console.error(ex);
            }
        };

        loadShops();
    }, []);
    
    return ( 
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>DANH MỤC SHOP</Text>
            {shops.map((shop, index)=>(
                <Text key={shop.id}>{shop?.diadiem}</Text>
            ))}
            
            {/* {console.log(shops)} */}
        </View>
    );


}

export default Home