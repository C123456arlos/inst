import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useGetSuggestesUser from '../hooks/useGetSuggestedUsers'
const SuggestedUsers = () => {
    const { isLoading, suggestedUsers } = useGetSuggestesUser()
    if (isLoading) return null
    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedHeader></SuggestedHeader>
            {suggestedUsers?.length !== 0 && (
                <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
                    <Text fontSize={12} fontWeight={'bold'} color={'gray.100'}>
                        suggested for you
                    </Text>
                    <Text fontSize={12} fontWeight={'bold'} _hover={{ color: 'gray.300' }} cursor={'pointer'}>
                        see all
                    </Text>
                </Flex>
            )}
            {suggestedUsers?.map(user =>
                <SuggestedUser
                    user={user} key={user.id}
                ></SuggestedUser>
            )}
            <Box fontSize={12} color={'gray.500'} mt={5}> copyright 2025 built by
                <Link href='https://www.google.com' target='_blank' color='blue.500' fontSize={14}> programmer</Link>
            </Box>
        </VStack>
    )
}

export default SuggestedUsers

