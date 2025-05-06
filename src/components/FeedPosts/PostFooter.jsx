import { Flex, Box, Text, InputGroup, Input, InputRightElement, Button, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants"
import usePostComment from "../hooks/usePostComment"
import useAuthStore from "../../store/authStore"
import useLikePost from "../hooks/useLikePost"
import timeAgo from '../../utils/timeAgo'
import CommentsModal from "../Modals/CommentsModal"
const PostFooter = ({ isProfilePage, post, creatorProfile }) => {
    const { isCommenting, handlePostComment } = usePostComment()
    const [comment, setComment] = useState('')
    const authUser = useAuthStore(state => state.user)
    const commentRef = useRef(null)
    const { handleLikePost, isLiked, likes } = useLikePost(post)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment)
        setComment('')
    }

    return <Box mb={10} marginTop={'auto'}>
        <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={4}>
            <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
                {!isLiked ? (<NotificationsLogo></NotificationsLogo>) : (<UnlikeLogo></UnlikeLogo>)}
            </Box>
            <Box cursor={'pointer'} fontSize={18} onClick={
                () => commentRef.current.focus()
            }>
                <CommentLogo></CommentLogo>
            </Box>
        </Flex>
        <Text fontWeight={600} fontSize={'sm'}>
            {likes} likes
        </Text>
        {isProfilePage && (
            <Text fontSize='12' color={'gray'}>posted {timeAgo(post.createdAt)}</Text>
        )}
        {!isProfilePage && (<>
            <Text fontSize='sm' fontWeight={700}>{creatorProfile?.username} {" "}
                <Text as='span' fontWeight={400}>{post.caption}
                </Text>
            </Text>
            {post.comments.length > 0 && (<Text fontSize='sm' color={'gray'} cursor={'pointer'} onClick={onOpen}
            >view all {post.comments.length} comments</Text>)}
            {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post}></CommentsModal> : null}
        </>)}
        {authUser && (<Flex alignItems={'center'} gap={2} justifyContent={'space-between'} w={'full'}>
            <InputGroup>
                <Input variant={'flushed'} placeholder={'add a comment'} fontSize={14}
                    onChange={(e) => setComment(e.target.value)} value={comment} ref={commentRef}></Input>
                <InputRightElement>
                    <Button fontSize={14} color={'blue.500'} fontWeight={600} cursor={'pointer'} _hover={{ color: 'white' }} bg={'transparent'}
                        onClick={handleSubmitComment} isLoading={isCommenting}>post</Button>
                </InputRightElement>
            </InputGroup>
        </Flex>)}
    </Box>
}

export default PostFooter



