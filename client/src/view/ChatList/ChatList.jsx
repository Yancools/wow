import './ChatList.css'
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import Menu from "../../components/Menu/Menu"
import { chats } from '../../http/communicationApi';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CommunicationContext } from '../../providers/CommunicationProvider';
import { SERVER_API } from '../../utils/consts';
const ChatList = observer(() => {
    const [translation] = useTranslation();
    const navigate = useNavigate();
    const {communicationStore} = useContext(CommunicationContext)
    const chatList = useLoaderData()
    useEffect(() => {
        async function getChats() {
            communicationStore.setChatList(chatList)
        }
        getChats();
        return (() => {
            communicationStore.setChatList([])
        })
    },[communicationStore, chatList])
    useEffect(() => {
        const interval = setInterval(async ()=>{
            try {
                const result = await chats()
                communicationStore.setChatList(result)
            } catch (error) {
                console.log(error)
            }
        }, 10000)
        return (() => {
            clearInterval(interval)
            communicationStore.setChatList([])
        })
        
    },[communicationStore])
    return (
        <div className="container">
            <div className = "section">
                <Menu/>
                <div className = "content">              
                    <div className="chatlist">
                        <div className="chatlist__header">
                            <div className="chatlist__header--title">
                                {translation("chatList.title")}
                            </div>
                            <button className="chatlist__header--button add" onClick={() =>{
                                navigate('/create')
                            }}/>
                        </div>
                        <div className="chatlist__content">
                            {   
                                communicationStore.chatList.length > 0 
                                ?
                                communicationStore.chatList.map((value, key) =>
                                    <div id={value?.chat?.id} className="chatItem"  key={key} onClick={() =>{
                                        navigate('/chat/' + value?.chat?.id)
                                    }}>
                                        <img className="chatItem__logo" src={SERVER_API + value?.chat?.photo} alt=""/>
                                        <div className="chatItem__data">
                                            <div className="chatItem__data--title">
                                                {value?.chat?.title}
                                            </div>
                                            <div className="chatItem__data--message">
                                                {value?.message?.content}
                                                {value?.message?.file}
                                            </div>
                                        </div>
                                        <p className="chatItem__time">
                                            {value?.message?.time} 
                                        </p>
                                    </div>
                                )
                                :
                                <div className="emptyChatList">
                                    Список чатов пуст!
                                </div>
                            }
                        </div>
                    </div>
                </div>        
        </div>
    </div>
    )
})
export const ChatsLoader = async () => {
    const res = await chats()
    if (res?.response?.status === 400 || res?.response?.status === 401){
        throw new Response(res?.response?.data?.message, {status: 404})
    }
    return res
}
export default ChatList;