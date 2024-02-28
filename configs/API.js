import axios from "axios";

export const endpoints = {
    'login': '/o/token/',
    'list-shop': '/shops/list-shop/',

    'current-user': '/users/current-user/',
    'tim-kiem-dish': '/dishes/tim-kiem-dish/',
    'them-category':(name)=> `/categories/?name=${name}`,
    'them-menu':'/menus',
    "danh-sach-comment": '/dishes/:dishId/comments',
    "them-comment": '/dishes/:dishId/comments',


}

export const authApi = (accessToken) => axios.create({
    baseURL: "http://192.168.17.110:8000",
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: "http://192.168.17.110:8000"
})