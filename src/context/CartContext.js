import React,{useReducer,createContext} from "react";

export const CartContext = createContext();

const initialState ={
cart:[],
delivery:{
    address:"",
    city:"",
    country:"",
},
};

