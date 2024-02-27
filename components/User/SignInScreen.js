import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { View, Text, TextInput, Touchable, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import API, { authApi, endpoints } from "../../configs/API";
import MyContext from "../../configs/MyContext";
import Style from "./Style";
import { Header } from "react-native/Libraries/NewAppScreen";
import {SocialIcon, Button} from '@rneui/themed'

const Login = ({navigation}) => {
    const [username, setUsername] = useState('shop1');
    const [password, setPassword] = useState('123');
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(MyContext);

    const login = async () => {
        setLoading(true);

        try {
            let res = await API.post(endpoints['login'], {
                "username": username, 
                "password": password,
                "client_id": "pkVV50s8T98xPUN4cb6xeaOOEzuFXuMSom4tsLeR",
                "client_secret": "WIfGt0iG7tzPlrXU81zZgK8UAiAhKnrNnxCkfxQNjnSbCazqkUSf6MkKsKBtYllDS1G0wCq1o5J68pHYUNAxLjkr8r6hm8OKugeY885CX7qIjiZwuwptrlRQPMWdcXVP",
                "grant_type": "password"
            });
            console.log(res.data)

            await AsyncStorage.setItem("access-token", res.data.access_token)
            let user = await authApi(res.data.access_token).get(endpoints['current-user']);
            dispatch({
                type: "login",
                payload: user.data
            });
            navigation.navigate("Home");
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style ={Style.container}>
            <Header title ="MY ACCOUNT"  type ="arrow-left" navigation ={navigation}/>  

            <View style ={{marginLeft:20, marginTop:10}}>
                <Text style ={Style.title}>Sign-In</Text>
            </View> 

            <View style ={{alignItems:"center",marginTop:10}}>
                <Text style= {Style.text1} >Please enter the email and password</Text>
                <Text style= {Style.text1} >registered with your account</Text> 
            </View>

            <TextInput value={username} onChangeText={t => setUsername(t)} style={Style.input} placeholder="Tên đăng nhập..." />
            <TextInput secureTextEntry={true} value={password} onChangeText={t => setPassword(t)} style={Style.input} placeholder="Mật khẩu..."/>     

            {loading===true?<ActivityIndicator />:<>
                <TouchableOpacity onPress={login}>
                    <Text style={Style.button}>Đăng nhập</Text>
                </TouchableOpacity>
            </>}

            <View style ={{alignItems:"center",marginTop:15}}>
                <Text style ={{...Style.text1, textDecorationLine:"underline"}}> Forgot Password ?</Text>
            </View> 

            <View style ={{alignItems:"center",marginTop:30, marginBottom:30}}>
                <Text style ={{fontSize:20, fontWeight:"bold"}}>OR</Text>
            </View>    

            <View style ={{marginTop:25,marginLeft:20}}>
                <Text style ={{...Style.text1,}}>New on XpressFood ?</Text>
            </View>           


            <View style ={{alignItems:"flex-end",marginHorizontal:20}}>
                <Button 
                    title ="Create an account"
                    buttonStyle ={Style.createButton}
                    titleStyle ={Style.createButtonTitle}
                    onPress ={()=>{navigation.navigate("SignUpScreen")}}
                />
            </View>

        </View>
    );
}

export default Login;