import { createContext, useReducer } from 'react'


export const ProductContext = createContext([] as any)

const initValue = {
    products: [],
    product: {}
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload
                // product nhận giá trị sau khi call api rồi lưu lại vào state
            }
        case 'GET_ONE':
            const productID = action.payload

            return {
                ...state,
                product: state.products.find((p: any) => p.id === productID)
            }
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case 'EDIT_PRODUCT':
            const dataUpdate = action.payload
            return {
                ...state,
                products: state.products.map((p: any) => (p.id === dataUpdate.id ? dataUpdate : p))
            }
        case 'REMOVE_PRODUCT':
            const id = action.payload
            return {
                ...state,
                products: state.products.filter((p: any) => p.id !== id)
            }
        default:
            return state
    }
}
const ProductProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initValue)

    return (
        <>
            <ProductContext.Provider
                value={{
                    state,
                    dispatch
                }}
            >
                {children}
            </ProductContext.Provider>
        </>
    )
}

export default ProductProvider
