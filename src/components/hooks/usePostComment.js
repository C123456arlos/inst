import React, { useState } from 'react'
import useShowToast from './useShowToast'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../../firebase/firebase'
import usePostStore from '../../store/postStore'
import useAuthStore from '../../store/authStore'
const usePostComment = () => {
    const [isCommenting, setIsCommenting] = useState(false)
    const showToast = useShowToast()
    const authUser = useAuthStore(state => state.user)
    const addComment = usePostStore(state => state.addComment)
    const handlePostComment = async (postId, comment) => {
        if (isCommenting) return
        if (!authUser) return showToast('error', 'you must be logged in to comment', 'error')
        setIsCommenting(true)
        const newComment = {
            comment: comment,
            createdAt: Date.now(),
            createdBy: authUser.uid,
            postId,
            // id:
        }
        try {
            await updateDoc(doc(firestore, 'posts', postId), {
                comments: arrayUnion(newComment)
            })
            addComment(postId, newComment)
        } catch (error) {
            showToast('error', error.message, 'error')
        } finally {
            setIsCommenting(false)
        }
    }
    return { isCommenting, handlePostComment }
}

export default usePostComment