import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import useAuthMutation from '@/hooks/useMutationAuth'
import { useLocalStorage } from '@/hooks/useStorage'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const FormSignIn = () => {
    const { toast } = useToast()
    const navigate = useNavigate()

    const { form, onSubmit } = useAuthMutation({
        action: 'SIGN_IN',
        onSuccess: () => {
            toast({
                description: 'Đăng Nhập thành công'
            })
            navigate('/')
        }
    })

    return (
        <div>
            <h1 className='font-bold'>Đăng Nhập</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name='email'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' {...field} placeholder='Email của bạn' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='password'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} placeholder='Mật khẩu của bạn' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant='destructive' type='submit'>
                        Đăng Nhập
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default FormSignIn
