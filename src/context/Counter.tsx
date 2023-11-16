import { createContext, useReducer } from 'react'

export const CounterContext = createContext({} as any)

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'INCREAMENT':
            return {
                count: state.count + 1
            }
        case 'DECREAMENT':
            return {
                count: state.count - 1
            }
        case 'INCREASEEE':
            return { count: state.count + action.payload }
        default:
            return state
    }
}
const CounterContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, { count: 0 })
    return (
        <>
            <CounterContext.Provider value={{ state, dispatch }}>{children}</CounterContext.Provider>
        </>
    )
}
export default CounterContextProvider
