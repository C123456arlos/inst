import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import useSignUpWithEmailAndPassword from '../hooks/useSignUpWithEmailAndPassword'

const Signup = () => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const { loading, error, signup } = useSignUpWithEmailAndPassword()
    return (
        <>
            <Input size={'sm'} placeholder='email' fontSize={'14'} type='email' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })}></Input>
            <Input size={'sm'} placeholder='username' fontSize={'14'} type='text' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })}></Input>
            <Input size={'sm'} placeholder='fullname' fontSize={'14'} type='text' value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}></Input>
            <InputGroup>
                <Input placeholder='password' fontSize={'14'} type={showPassword ? 'text' : 'password'} value={inputs.password}
                    size={'sm'} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}></Input>
                <InputRightElement h='full'>
                    <Button variant={'ghost'} size={'sm'} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon></ViewIcon> : <ViewOffIcon></ViewOffIcon>}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {error && (<Alert status='error' fontSize={13} p={2} borderRadius={4}><AlertIcon fontSize={12}></AlertIcon>{error.message}</Alert>)}
            <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14}
                isLoading={loading}
                onClick={() => signup(inputs)}
            >sign up</Button>
        </>
    )
}

export default Signup