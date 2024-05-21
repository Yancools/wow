import './Chat.css'
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Menu from "../../components/Menu/Menu"
import { chat, sendMessage } from '../../http/communicationApi';
import { useLoaderData, useParams } from 'react-router-dom';
import { CommunicationContext } from '../../providers/CommunicationProvider';
import { SERVER_API } from '../../utils/consts';
import { UserContext } from '../../providers/UserProvider';

const Chat = observer(() => {
    const {communicationStore} = useContext(CommunicationContext)
    const {userStore} = useContext(UserContext)

    const chatData = useLoaderData()
    console.log(chatData)
    let {id} = useParams()
    useEffect(() => {
        async function getChats() {
            communicationStore.setChat(chatData)
        }
        getChats();
        return (() => {
            communicationStore.setChat([])
        })
    },[communicationStore, chatData, id])
    useEffect(() => {
        const interval = setInterval(async ()=>{
            try {
                const result = await chat(id)
                communicationStore.setChat(result)
            } catch (error) {
                console.log(error)
            }
        }, 10000)
        return (() => {
            clearInterval(interval)
            communicationStore.setChat([])
        })
        
    },[communicationStore, id])
    const [text, setText] = useState('');
    const [file, setFile] = useState('');
    const send = async (e) => {
        e.preventDefault();
        try {
            if(!text && !file){
                alert("Сообщение не может быть пустым")
                return false
            }
            const data = new FormData();
            data.append('file', file);
            data.append('content', text);
            data.append('chatId', communicationStore?.chat?.id);
            await sendMessage(data)
            await chat(id)
            setText('')
            setFile('')
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="container">
            <div className = "section">
                <Menu/>
                <div className = "content"> 
                    <div className="chat">
                        <div className="chat__header">
                            <div className="chat__header--title">
                                {communicationStore?.chat?.title}
                            </div>
                            {communicationStore?.chat?.nickname ?
                                <div className="chat__header--nickname">
                                    {'@' + communicationStore?.chat?.nickname}
                                </div>
                                :
                                null
                            }
                            <img className="chat__header--photo" src={SERVER_API + communicationStore?.chat?.photo} alt=""/>
                        </div>
                        <div className="chat__content">
                            {
                                communicationStore?.chat?.messages?.length > 0 
                                ?
                                communicationStore.chat.messages && communicationStore.chat.messages.map((value, key) =>
                                    <div className={value?.user?.nickname !== userStore.userData.nickname ? "message" : "message me"} key={key}>
                                        <div className="message__data">
                                            <div className="message__data--title">
                                                {value?.user?.firstname + ' ' + value?.user?.lastname}
                                            </div>
                                            <div className="message__data--time">
                                                {value?.time}
                                            </div>
                                        </div>
                                        <div className="message__content">            
                                            <p>
                                                {value.content}
                                            </p>
                                            <p>
                                                {value.file}
                                            </p>
                                            
                                        </div>
                                        
                                    </div>
                                )
                                :
                                <div className="emptyChat">
                                    В этом чате еще нет сообщений!
                                </div>
                            }                            
                        </div>
                        <form className="chat__input">
                            <input 
                                id="file" 
                                type="file" 
                                className="chat__input--attach"
                                onChange={ e => setFile(e.target.files[0])}
                                />
                            <label htmlFor="file" className="chat__input--label" />
                            <input type="text" className="chat__input--message" 
                                value={text}
                                onChange={ e => setText(e.target.value)}
                            />
                            <button className="chat__input--send send" onClick={send}/>
                        </form>
                    </div>
                </div>        
        </div>
    </div>
    )
})
export const ChatLoader = async ({params}) => {
    const res = await chat(params.id)
    if (res?.response?.status === 400 || res?.response?.status === 401){
        throw new Response(res?.response?.data?.message, {status: res?.response?.status})
    }
    return res
}
export default Chat;