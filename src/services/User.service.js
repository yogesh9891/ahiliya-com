import axios from "axios";
import { url } from "./url.service";
import jwt_decode from "jwt-decode";
import { axiosApiInstance } from "../App";
let serverUrl = `${url}/users`;




export const registerUser = async (obj) => {
    return axios.post(`${serverUrl}/register/`, obj)
}

export const loginUser = async (obj) => {
    return axios.post(`${serverUrl}/login/`, obj)
}
export const foragetPasword = async (obj) => {
    return axios.post(`${serverUrl}/foragetPasword/`, obj)
}

export const resetPasword = async (id,obj) => {
    return axios.post(`${serverUrl}/resetPasword/${id}`, obj)
}


export const getUserById = async () => {
    let decoded = getDecodedToken()
    return axiosApiInstance.get(`${serverUrl}/getById/${decoded.userId}`)
}




export const setToken = (token) => {
    localStorage.setItem("Auth-token-ahilya", token);
}

export const getToken = () => {
    return localStorage.getItem("Auth-token-ahilya");
}


export const getDecodedToken = () => {
    let token = localStorage.getItem("Auth-token-ahilya");
    if(!token){
        return 0;
    }
    let decodedToken = jwt_decode(token)
    return decodedToken
}

export const removeToken = () => {
    localStorage.removeItem("Auth-token-ahilya");
}


export const AddReview = async (obj) => {
    return axiosApiInstance.post(`${url}/productReview/`, obj)
}

export const refreshToken = async (obj) => {
    return axios.post(`${serverUrl}/refreshToken`, obj)
}

