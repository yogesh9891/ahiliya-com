import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/order`;

export const createOrder = async (formData) => {
  return await axiosApiInstance.post(`${serverUrl}/createOrder`, formData);
};

export const createGuestOrder = async (obj) => {
  return await axiosApiInstance.post(`${serverUrl}/createGuestOrder`, obj);
};
export const orderCallback = async (obj, id) => {
  return await axios.get(`${serverUrl}/paymentCallback/${id}?${obj}`);
};


export const paypalPaymentCallback = async (obj, id) => {
  return await axios.post(`${serverUrl}/paypalPaymentCallback/${id}`, obj);
};

export const getOrderByUserId = async () => {
  return await axiosApiInstance.get(`${serverUrl}/getAllActiveOrdersByUserId`);
};

export const getOrderById = async (id) => {
  return await axiosApiInstance.get(`${serverUrl}/getOrderById/${id}`);
};
export const createCodOrder = async () => {
  return await axiosApiInstance.post(`${serverUrl}/createCodOrder`);
};
