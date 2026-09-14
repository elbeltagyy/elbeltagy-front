import TitleSection from "../../components/ui/TitleSection"
import Section from "../../style/mui/styled/Section"
import LoaderSkeleton from "../../style/mui/loaders/LoaderSkeleton";
import { useDeleteConversationMutation, useLazyGetConversationsQuery, useMarkConversationSeenMutation, useSendMessageMutation, useUpdateConversationMutation } from "../../toolkit/apis/socials/conversationsApi";
import usePaginate from "../../hooks/usePaginate";

import { useState } from "react";
import ChatConversations from "../../components/ui/chat/ChatConversations";
import { useLazyGetNotificationsQuery } from "../../toolkit/apis/notificationsApi";
import usePostData from "../../hooks/usePostData";
import Whatsapp from "../../components/whatsapp/Whatsapp";
import { Typography } from "@mui/material";
import { FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox";
import { FiberManualRecord } from "@mui/icons-material";


function WhatsappPage() {
    const [conversation, setConversation] = useState()

    //Conversations
    const [getData, status] = useLazyGetConversationsQuery()
    const { data: conversations, hasMore, loadMore, setData } = usePaginate({ getData, key: 'conversations', pollingInterval: 60000, limit: 10, params: { sortkey: 'lastMessage.createdAt', sortValue: '-1' } })

    //Conversation Messages
    const [getMessages] = useLazyGetNotificationsQuery()
    const { data: messages, hasMore: hasMoreNotifications, loadMore: loadMoreNotifications, setReset } = usePaginate({
        getData: getMessages, key: 'notifications', pollingInterval: 10000, limit: 100, skip: !conversation, params: {
            phone: conversation?.phone
        }
    })

    //Conversation Click
    const [sendData] = useMarkConversationSeenMutation()
    const [markSeen] = usePostData(sendData)

    const onConversationClick = async (conversation) => {
        await markSeen({ phone: conversation.phone })
        setData(pre => {
            return pre.map(m => {
                if (m.phone === conversation.phone) {
                    return { ...m, unreadCount: 0 }
                } else {
                    return m
                }
            })
        })
    }

    //conversation Delete
    const [sendDelete] = useDeleteConversationMutation()
    const [deleteConversationFc] = usePostData(sendDelete)

    const deleteConversation = async (conv) => {
        await deleteConversationFc(conv)
        setData(pre => {
            return pre.filter(m => m._id !== conv._id)
        })
    }


    //Send Message
    const [send, sendStatus] = useSendMessageMutation()
    const [sendMessageFc] = usePostData(send)

    const sendMessage = async (message) => {
        await sendMessageFc({ phone: conversation.phone, message: message.text, file: message.attachment }, true)
        setTimeout(() => {
            setReset()
        }, 5000)
    }

    const [sendUpdate, updateStatus] = useUpdateConversationMutation()
    const [updateConversation] = usePostData(sendUpdate)

    const ignoreOrUnIgnoreConversation = async (conversation, ignored) => {
        const newConversation = await updateConversation({ ...conversation, ignored })
        setData(prev => {
            return prev.map(conv => {
                if (conv._id === newConversation._id) {
                    return newConversation
                } else {
                    return conv
                }
            })
        })
    }

    // linkage => first click
    // Temp files handling

    return (
        <Section>
            <TitleSection title={'واتساب'} />
            <Whatsapp />
            {/* <FlexColumn sx={{ p: '16px', bgcolor: 'background.alt', alignItems: 'flex-start' }}>
                <FlexRow gap={'4px'}> <FiberManualRecord sx={{ fontSize: '8px !important' }} /> <Typography>واتساب غير رسمي مجانا تماما</Typography></FlexRow>
                <FlexRow gap={'4px'}> <FiberManualRecord sx={{ fontSize: '8px !important' }} /><Typography> يسمح لك بالتواصل مع ارقامك والرد السريع - وامن تماما </Typography></FlexRow>
                <FlexRow gap={'4px'}> <FiberManualRecord sx={{ fontSize: '8px !important' }} /><Typography> قد يتعرض رقمك للحظر عند ارسال رساله دعائيه لعدد مستخدمين كبير في نفس الوقت</Typography></FlexRow>
            </FlexColumn > */}

            {status.isLoading && <LoaderSkeleton />}

            <ChatConversations
                conversations={conversations}
                onConversationClick={onConversationClick}
                deleteConversation={deleteConversation}
                ignoreOrUnIgnoreConversation={ignoreOrUnIgnoreConversation} updateStatus={updateStatus}
                status={status} conversation={conversation} setConversation={setConversation}
                hasMore={hasMore} loadMore={loadMore}
                messages={
                    {
                        messages,
                        status: sendStatus,
                        hasMore: hasMoreNotifications, loadMore: loadMoreNotifications, sendMessage,
                        multipleAttachments: false
                    }
                }
            />
        </Section >
    )
}

export default WhatsappPage