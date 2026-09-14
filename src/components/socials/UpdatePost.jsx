import { IconButton, Stack, TextField } from '@mui/material'
import React from 'react'
import Section from '../../style/mui/styled/Section'
import MakeForm from '../../tools/makeform/MakeForm'
import { useUpdatePostMutation } from '../../toolkit/apis/socials/facebookApi'
import usePostData from '../../hooks/usePostData'

function UpdatePost({ post, setPosts, setReset, pageId }) {

    const [sendData, status] = useUpdatePostMutation()
    const [updatePost] = usePostData(sendData)

    const inputs = [{
        name: 'message',
        label: 'الموضوع',
        value: post.message,
        rows: 5,
        helperText: 'لا يمكنك تعديل الملفات - لتغيير الصور من اعدادات المنشور علي فيسبوك'
    }, {
        name: 'postId',
        value: post.id,
        disabled: true,
        hidden: true
    },{
        name: 'pageId',
        value: pageId,
        disabled: true,
        hidden: true
    }]

    const onSubmit = async (values) => {
        await updatePost(values)
        setPosts(p => {
            return p.map(oldPost => {
                if (oldPost.id === post.id) {
                    return { ...oldPost, message: values.message }
                } else {
                    return oldPost
                }
            })
        })
    }
    return (
        <Section>
            <MakeForm inputs={inputs} status={status} onSubmit={onSubmit} />
        </Section>
    )
}

export default UpdatePost