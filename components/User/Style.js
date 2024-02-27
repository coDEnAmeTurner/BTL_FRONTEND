import { StyleSheet } from "react-native";
import { colors } from "../../styles/MyStyles";

export default StyleSheet.create({
    input: {
        width: "100%",
        height: 50,
        padding: 5,
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: "lightgray"
    }, 
    button: {
        textAlign: "center",
        backgroundColor: "darkblue",
        color: "white",
        padding: 10
    }, 
    avatar: {
        width: 80,
        height: 80,
        margin: 5
    },

    container :{
        flex:1
    },

    text1:{
        color:colors.grey3,
        fontSize:16
    },

    TextInput1:{
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
        paddingLeft:15
      },

    TextInput2:{
    borderWidth:1,
        borderRadius:12,
        marginHorizontal:20,
        borderColor:"#86939e",
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center",
        paddingLeft:15

    },

    SocialIcon :{
        borderRadius :12,
        height:50
    },

    createButton:{
        backgroundColor:"white",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1, 
        borderColor:"#ff8c52",
        height:40,
        paddingHorizontal:20,
    },

    createButtonTitle:{
        color:"#ff8c52",
        fontSize:16,  
        fontWeight:"bold" ,
        alignItems:"center",
        justifyContent:"center"  ,
        marginTop:-3
    }
})