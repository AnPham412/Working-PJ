import React, {useReducer, createContext} from "react";

export const CartContext = createContext();

const initialState = {
    cart: [],
    delivery: {
        vendee: "",
        address: "",
        city: "",
        date: {
            day: "",
            month: "",
            year: "",
        },
    },
};

const CartReducer = (state, action) => {
    let clothe;
    switch (action.type) {
        case "ADD":
            clothe = action.payload;
            const found = state.cart.find(
                (clotheCart) => clotheCart.id === clothe.id
            );
            if (found) {
                return {
                    ...state,
                    cart: state.cart.map((clotheCart) => {
                        if (clotheCart.id === clothe.id) {
                            return {...clotheCart, quantity: clotheCart.quantity + 1};
                        }
                        return clotheCart;
                    }),
                };
            } else {
                return {...state, cart: [...state.cart, {...clothe, quantity: 1}]};
            }

        case "INC_QUANT":
            return {
                ...state,
                cart: state.cart.map((clotheCart) => {
                    if (clotheCart.id === action.payload) {
                        return {...clotheCart, quantity: clotheCart.quantity + 1}
                    }
                    return clotheCart;
                }),
            };

        case "DEC_QUANT":
            return {
                ...state,
                cart: state.cart.map((clotheCart) => {
                    if (clotheCart.id === action.payload) {
                        return {...clotheCart, quantity: clotheCart.quantity + 1}
                    }
                    return clotheCart;
                }).filter((clothe) => clothe.quantity > 0),
            };

        case "DEL_CLOTHE":
            return {
                ...state,
                cart: state.cart.filter((clothe) => clothe.id !== action.payload),
            };

        case "CLEAR":
            return {...state, cart: []};

        case "SET_DELIVERY":
            return {...state, delivery: action.payload};

        default:
            return state;
    }
};

function CartContextProvider({children}) {
    const [state, dispatch] = useReducer(CartReducer, initialState);

    const checkout = async (order, cb) => {
        //try catch api?
        cb();
    };
    return (
        <CartContext.Provider
            value={{
                clotheCart: state.cart,
                dispatch,
                delivery: state.delivery,
                checkout,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;