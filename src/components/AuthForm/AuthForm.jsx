import { Box, VStack, Image, Text, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import GoogleAuth from './GoogleAuth'
const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)
    return <>
        <Box border={'1px solid gray'} borderRadius={4} padding={5}>
            <VStack spacing={4}>
                <Image src='/logo.png' h={24} cursor={'pointer'} alt='instagram'></Image>
                {isLogin ? <Login></Login> : <Signup></Signup>}
                <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} w={'full'}>
                    <Box flex={2} h={'1px'} bg={'gray.400'}></Box>
                    <Text mx={1} color={'white'}>or</Text>
                    <Box flex={2} h={'1px'} bg={'gray.400'}></Box>
                </Flex>
                <GoogleAuth prefix={isLogin ? 'log in' : 'sign up'}></GoogleAuth>
            </VStack>
        </Box>
        <Box border={'1px solid gray'} borderRadius={4} padding={5}>
            <Flex alignItems={'center'} justifyContent={'center'}>
                <Box mx={2} fontSize={14}>
                    {isLogin ? "don't have an account" : 'already have an account'}
                </Box>
                <Box onClick={() => setIsLogin(!isLogin)} color={'blue.500'} cursor={'pointer'}>
                    {isLogin ? 'sign up' : 'log in'}
                </Box>
            </Flex>
        </Box>
    </>
}

export default AuthForm