import axios from "axios";
import { url } from "./url.service";

let serverUrl = `${url}/blog`;


export const getBlogAllCategories = async (query) => {
    return axios.get(`${url}/blogCategory?${query}`)
}


export const getBlogAll = async (query) => {
    return axios.get(`${serverUrl}?${query}`)
}

export const getBlogBySlug = async (slug) => {
    return axios.get(`${serverUrl}/blog/${slug}`)
}


