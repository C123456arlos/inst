import { Avatar, Flex, Box, Text, SkeletonCircle, Skeleton, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useFollowUser from '../hooks/useFollowUser'
import timeAgo from '../../utils/timeAgo'

const PostHeader = ({ post, creatorProfile }) => {
    const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy)
    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} mb={2}>
            <Flex alignItems={'center'} gap={2}>
                {creatorProfile ? (<Link to={`${creatorProfile.username}`}>
                    <Avatar src={creatorProfile?.profilePicURL} alt='user profile pic' size={'sm'}></Avatar>
                </Link>) : (<SkeletonCircle size='10'></SkeletonCircle>)}

                <Flex fontSize={12} fontWeight={'bold'} gap='2'>
                    {creatorProfile ? (<Link to={`${creatorProfile.username}`}>
                        {creatorProfile?.username}
                    </Link>) : (<Skeleton w={'100px'} h={'10px'}></Skeleton>)}

                    <Box color={'gray.500'}>
                        {timeAgo(post.createdAt)}
                    </Box>
                </Flex>
            </Flex>
            <Box cursor={'pointer'}>
                <Button
                    size={'xs'} bg={'transparent'} fontSize={12} color={'blue.500'} fontWeight={'bold'} _hover={{ color: 'white' }}
                    onClick={handleFollowUser} isLoading={isUpdating} transition={'0.2s ease-in-out'}>
                    {isFollowing ? 'unfollow' : 'follow'}
                </Button>
            </Box>
        </Flex>
    )
}

export default PostHeader




