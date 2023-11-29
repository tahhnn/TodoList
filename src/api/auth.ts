import instance from './instance'

export const signIn = async (user: any) => {
    return await instance.post('/signin', user)
}
export const signUp = async (user: any) => {
    return await instance.post('/signup', user)
}
