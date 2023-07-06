import { axiosApiInstance } from "../App";
import { getCountryFromLocal, getCurrencyRate } from "./Currency.service";
import { url } from "./url.service";
import axios from "axios";


let serverUrl = `${url}/userCart`;

export const getCartData = async () => {
  return axiosApiInstance.get(`${serverUrl}/`);
};

export const getCartDataApi = async () => {
  return axiosApiInstance.get(`${serverUrl}/get`);
};

export const addItemQuantityInCart = async (id,obj={}) => {
  let currencyObj = JSON.parse(getCurrencyRate());
  let country = getCountryFromLocal();
   obj.currencyObj = currencyObj
   obj.country = country
  return axiosApiInstance.patch(`${serverUrl}/increaseQuantity/${id}`,obj);
};
export const removeItemCart = async (id,varientId="") => {
  return axiosApiInstance.patch(`${serverUrl}/removeProduct/${id}?varientId=${varientId}`);
};

export const removeItemQuantityInCart = async (id,varientId="") => {
  return axiosApiInstance.patch(`${serverUrl}/decrementProductQuantity/${id}?varientId=${varientId}`);
};

export const addAddressInCart = async (obj) => {
  return axiosApiInstance.post(`${serverUrl}/addAddressInCart`, obj);
};

export const addLocalCartToUser = async (obj) => {
  return axiosApiInstance.post(`${serverUrl}/addLocalCart`, obj);
};

export const getCartShippingCharge = async (quey,data) => {
  return axiosApiInstance.post(`${url}/shipping/getshipping-charges?${quey}`,data);
};

export const ApplyCouponApi = async (query,formData) => {
  return axios.patch(`${url}/coupon/applyCoupon/${query}`,formData);
};