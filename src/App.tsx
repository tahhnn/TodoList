import './App.css'
import ProductList from './components/TodoList'
import { FormEdit } from './components/FormEdit'
import { Link, RouteObject, useRoutes } from 'react-router-dom'
import NotFound from './components/NotFound'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <ProductList />
    },
    {
        path: '/sort/:param',
        element: <ProductList />
    },
    {
        path: '/edit/:id',
        element: <FormEdit />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: '*',
        element: <NotFound />
    }
]
function App() {
    return useRoutes(routes)
}
export default App
