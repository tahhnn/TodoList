import { useLocalStorage } from '@/hooks/useStorage'
import React, { createContext } from 'react'
import {} from 'vm'

export const LocalStorage = createContext([[] as any])
const LocalStorageProvider = ({ children }: any) => {
    const [user, setUser, removeUser] = useLocalStorage('user', {})
    return (
        <>
            <LocalStorage.Provider value={{ user, setUser, removeUser }}>{children}</LocalStorage.Provider>
        </>
    )
}

export default LocalStorageProvider
