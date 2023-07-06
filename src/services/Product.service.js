import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/product`;


export const getAllProducts = async (query) => {
    return axiosApiInstance.get(`${serverUrl}/getProducts/?${query}`)
}


export const getProductById = async (id) => {
    return axiosApiInstance.get(`${serverUrl}/getProductById/${id}`)
}


export const getProductReviews = async (query) => {
    return axiosApiInstance.get(`${url}/productReview/getReviewOfProduct?${query}`)
}



