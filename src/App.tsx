import './App.css'
import { FormEdit } from './components/FormEdit'
import { RouteObject, useRoutes } from 'react-router-dom'
import NotFound from './components/NotFound'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import TodoList from './components/TodoList'
import PrivateRoute from './components/PrivateRouter'
import { LocalStorage } from './context/LocalStorage'
import { useContext } from 'react'

function App() {
    const { user } = useContext(LocalStorage)
    console.log(user)

    const routes: RouteObject[] = [
        {
            path: '/',
            element: (
                <PrivateRoute user={user}>
                    <TodoList />
                </PrivateRoute>
            )
        },
        {
            path: '/sort/:param',
            element: (
                <PrivateRoute user={user}>
                    <TodoList />
                </PrivateRoute>
            )
        },
        {
            path: '/edit/:id',
            element: (
                <PrivateRoute user={user}>
                    <FormEdit />
                </PrivateRoute>
            )
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
    return useRoutes(routes)
}
export default App
