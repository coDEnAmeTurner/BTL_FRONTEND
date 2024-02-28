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


const Comment = ({ dishId }) => {

    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
  
    const [selectedParentComment, setSelectedParentComment] = useState(null);
  
    useEffect(() => {
      getComments();
    }, []);
  
    const getComments = async () => {
      const response = await authApi.get(endpoints["danh-sach-comment"]);
      setComments(response.data);
    }
  
    const addComment = async () => {
      await authApi.post(endpoints["them-comment"], {
        content,
        dishId
      });
  
      getComments();
    }
  
    const renderComment = (comment) => {
        return (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <button 
              onClick={() => setSelectedParentComment(comment)}
            >
              Reply
            </button>
    
            {selectedParentComment?.id === comment.id && (
              <form>
                <input 
                  value={content}
                  onChange={(e) => setContent(e.target.value)} 
                />
                <button onClick={addComment}>Submit</button>
              </form>
            )}
          </div>
        )
      }
    
      return (
        <div>
          {comments.map(renderComment)}
        </div>
      )
    
    }
    
export default Comment;