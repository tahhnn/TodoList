import React, { useContext } from 'react'
import { CounterContext } from './context/Counter'

const Counter = () => {
    const { state, dispatch } = useContext(CounterContext)
    console.log(state.count)

    return (
        <>
            Couter - {state.count}
            <button onClick={() => dispatch({ type: 'INCREAMENT' })}>Thêm</button>
            <button onClick={() => dispatch({ type: 'DECREAMENT' })}>Giảm</button>
            <button onClick={() => dispatch({ type: 'INCREASEEE', payload: 10 })}>Thêm n</button>
        </>
    )
}
export default Counter
