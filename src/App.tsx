import { ChangeEvent, useContext, useRef } from 'react'
import './App.css'
import ProductList from './components/TodoList'
import FormAdd from './components/FormAdd'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
function App() {
    return (
        <>
            {/* <Counter /> */}
            <QueryClientProvider client={queryClient}>
                <ProductList />
                <FormAdd />
            </QueryClientProvider>
        </>
    )
}
export default App
