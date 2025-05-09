import { Avatar, AvatarGroup, Button, Flex, Text, useDisclosure, useProgressStyles, VStack } from '@chakra-ui/react'
import React from 'react'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore'
import EditProfile from './EditProfile'
import useFollowUser from '../hooks/useFollowUser'
const ProfileHeader = () => {
    const { userProfile } = useUserProfileStore()
    const authUser = useAuthStore(state => state.user)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid)
    const visitingOwnProfileAndAuth = authUser && authUser?.username === userProfile?.username
    const visitingAnotherProfileAndAuth = authUser && authUser?.username !== userProfile?.username
    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: 'row' }}>
            <AvatarGroup size={{ base: 'xl', md: '2xl' }} justifySelf={'center'} alignSelf={'flex-start'} mx={'auto'}>
                <Avatar
                    src={userProfile?.profilePicURL}
                    alt='programmer logo'></Avatar>
            </AvatarGroup>
            <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
                <Flex gap={4} direction={{ base: 'column', md: 'row' }} justifyContent={{ base: 'center', sm: 'flex-start' }}
                    alignItems={'center'} w={'full'}>
                    <Text fontSize={{ base: 'sm', md: 'lg' }}>
                        {userProfile?.username}
                    </Text>
                    {visitingOwnProfileAndAuth &&
                        <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                            <Button bg={'white'} color={'black'} _hover={{ bg: 'whiteAplha.800' }} size={{ base: 'xs', md: 'sm' }}
                                onClick={onOpen}>edit profile</Button>
                        </Flex>
                    }
                    {visitingAnotherProfileAndAuth &&
                        <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                            <Button bg={'blue.600'} color={'white'} _hover={{ bg: 'blue.600' }} size={{ base: 'xs', md: 'sm' }}
                                onClick={handleFollowUser} isLoading={isUpdating}>{isFollowing ? 'unfollow' : 'follow'}</Button>
                        </Flex>
                    }

                </Flex>
                <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }}>
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as='span' fontWeight={'bold'} mr={1}>
                            {userProfile?.posts?.length}
                        </Text>
                        posts
                    </Text>
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as='span' fontWeight={'bold'} mr={1}>
                            {userProfile?.followers?.length}
                        </Text>
                        followers
                    </Text>
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as='span' fontWeight={'bold'} mr={1}>
                            {userProfile?.following?.length}
                        </Text>
                        following
                    </Text>
                </Flex>
                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={'sm'} fontWeight={'bold'}>
                        {userProfile?.fullName}
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={'sm'}>
                        {userProfile?.bio}
                    </Text>
                </Flex>
            </VStack>
            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}></EditProfile>}
        </Flex>
    )
}

export default ProfileHeader



