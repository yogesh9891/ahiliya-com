import { BlockedCategory, BlockedCountry } from "../utils/country";
import { getCountryFromLocal, getCurrencyRate } from "./Currency.service";



    export const getLocalCart = () => {
        let localCart = localStorage.getItem("local-cart"); 
        let  cart = JSON.parse(localCart);
        return {data:{data:cart,message:"list of cart"}};  
    }

    export const addItemInToLocalCart = (item,obj={}) => {
    
        let localCart = localStorage.getItem("local-cart"); 
        if(!localCart){
            localCart = JSON.stringify([])
            localStorage.setItem("local-cart",localCart)
        }   
        let  cart = JSON.parse(localCart);

        let cartCopy = [...cart];
        let message = '';
        //assuming we have an ID field in our item
        let {_id:ID} = item;
        //look for item in cart array
        let country = getCountryFromLocal();
        let currencyObj = JSON.parse(getCurrencyRate())
        if((item.wooden == true && BlockedCountry.includes(country))||(item.wooden == true  && currencyObj.code == 'AUD')){
        return {data:{data:[],message:"Please Contact to seller"}}; 
        }
        // console.log(ID,"existingItemId")
        let existingItem = "";
        if(obj.variantobj && obj.variantobj._id){
            existingItem = cartCopy.find(item => item.varientId == obj.variantobj._id && item.productId ==ID);
       } else {
           existingItem = cartCopy.find(cartItem => cartItem.productId == ID);
       }
        // console.log(existingItem,"existingItem")
        // console.log(obj,"obj")
        //if item already exists
        let stockQuantity = 1;
       
        if(obj && obj.quantity){
            stockQuantity = obj.quantity;
        } 

    
            if(obj.attribute && (obj.attribute != "")){
                // console.log(existingItem,"existingItem",obj.stock)
                if(existingItem){   
                    if((existingItem.quantity + stockQuantity) <= obj.stock){
                        existingItem.quantity += stockQuantity//update item
                        existingItem.size = obj.attribute;
                        existingItem.variantobj = obj.variantobj;

                        // console.log(existingItem,"updatedItem")
                        message = "Product's quantity Updated";
                    } else {
                        message = "Product is Out of Stock";
                    }
                } else {
                    if(stockQuantity <= obj.stock){

                            let weight = 0;
                            let wegihtType = 1;

                            if(item?.product_dimension_weight){
                                if(item?.dimensionWeightType.toLowerCase() == 'kg'){
                                    wegihtType = 1000
                                }
                                weight = item?.product_dimension_weight*parseInt(wegihtType);
                            }

                        let  newItem = {
                            productId: `${item._id}`,
                            productName: `${item?.name}`,
                            price: obj.price,
                            sku: item?.sku ? item?.sku : "",
                            parentProductId: item?.parentProductId ? item?.parentProductId : "",
                            productImage: item?.imageArr[0]?.image ? item?.imageArr[0]?.image : "",
                            description: item?.description,
                            weight:weight,
                            quantity:stockQuantity,
                            stock:obj?.stock,
                            size:obj.attribute,
                            variantobj:obj.variantobj,
                            varientId:obj.variantobj._id
                        }
                        cartCopy.push(newItem);
                        message = "Product Added into cart Successfully";
                    } else {
                        message = "Product is Out of Stock";
                    } 
    
                }   
              
            } else {
                    if(existingItem){
                        // console.log(existingItem,"single product")
                        if((existingItem.quantity + stockQuantity) <= existingItem.stock){
                            existingItem.quantity += stockQuantity//update item
                            message = "Product's quantity Updated";
                        } else {
                            message = "Product is Out of Stock";
                        }
                    } else {
                        if(stockQuantity <= item.stock){
                            let weight = 0;
                            let wegihtType = 1;

                            if(item?.product_dimension_weight){
                                if(item?.dimensionWeightType && item?.dimensionWeightType.toLowerCase() == 'kg'){
                                    wegihtType = 1000
                                }
                                weight = item?.product_dimension_weight*parseInt(wegihtType);
                            }

                            let  newItem = {
                                productId: `${item._id}`,
                                productName: `${item?.name}`,
                                price: item.mrp,
                                sku: item?.sku ? item?.sku : "",
                                parentProductId: item?.parentProductId ? item?.parentProductId : "",
                                productImage: item?.imageArr[0]?.image ? item?.imageArr[0]?.image : "",
                                description: item?.description,
                                quantity:stockQuantity,
                                weight:weight,
                                stock:item?.stock,
                                size:"",
                                varientId:"",
                                variantobj:{}
                            }
                            cartCopy.push(newItem)
                            message = "Product Added into cart Successfully";
                        } else {
                            message = "Product is Out of Stock";
                        }
                    }

        }
        //make cart a string and store in local space
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("local-cart", stringCart)
        return {data:{data:cartCopy,message:message}};    
    }

    export const removeItemFromlocalCart = (itemID,varientId="") => {
        //create cartCopy
        // console.log(itemID,varientId)
        let localCart = localStorage.getItem("local-cart");    
        let  cart = JSON.parse(localCart);
        let cartCopy = [...cart];
        if(itemID && varientId){
            // console.log(cartCopy,"cartCopycartCopy",itemID)
            let filterIndex = cartCopy.findIndex(item => item.varientId == varientId && item.productId ==itemID);
            if(filterIndex != -1){
                cartCopy.splice(filterIndex,1);
            }
            // console.log(cartCopy,"localCartlocalCart",varientId)

        } else {
        cartCopy = cartCopy.filter(item => item.productId != itemID);
        }
        let cartString = JSON.stringify(cartCopy)
        // console.log(cartCopy,"cartCopycartCopy")
        localStorage.setItem('local-cart', cartString)
        return {data:cartCopy,message:"Item removed from card successfully"};    

    }

    export const reduceItemFromlocalCart = (itemID,varientId ='') => {
        //create cartCopy
    
        let localCart = localStorage.getItem("local-cart");    
        let  cart = JSON.parse(localCart);
        let cartCopy = [...cart];
        let existingItem = cartCopy.find(cartItem => cartItem.productId == itemID);
        if(itemID && varientId){
             existingItem = cartCopy.find(item => item.varientId == varientId && item.productId ==itemID);
        } else {
            existingItem = cartCopy.find(cartItem => cartItem.productId == itemID);
        }
        if (existingItem && existingItem.quantity > 1 ) {
            existingItem.quantity -= 1//update item
        }
        let cartString = JSON.stringify(cartCopy)
        localStorage.setItem('local-cart', cartString)
        return {data:cartCopy,message:"Cart Updated Succefully"};    

    }


    export const clearLocalCart = () => {
        
        localStorage.removeItem('local-cart')
        return { message:"cart clear"};    


    }