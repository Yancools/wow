import './Create.css'
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import Menu from "../../components/Menu/Menu"
import { useNavigate } from 'react-router-dom';
import { SERVER_API } from '../../utils/consts';
import { useDebounce } from '../../hooks/useDebounce';
import { searchUser } from '../../http/userAPI';
import { createChat, createConversation } from '../../http/communicationApi';
const Create = observer(() => {
    const [translation] = useTranslation();
    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const debouncedValue = useDebounce(search, 1000)
    const [userData, setUserData] = useState('')
    const [title, setTitle] = useState('');
    const selected = false
    const [users, setUsers] = useState([])
    useEffect(() =>{
        const Search = async (e) => {
            if(debouncedValue){
                try {
                    await searchUser(debouncedValue)
                    .then(result => {
                        if(result) {
                            setUserData(result)
                        }
                    })
                } catch (error) {
                    alert(error.response?.data?.message)
                }
            } else{
                setUserData([])
            }
        }
        Search()
    }, [debouncedValue])
    const send = async (e) => {
        e.preventDefault();
        try {
            if(users.length === 0){
                alert("Данные для отправки не могут быть пустыми!")
                return false
            }
            if(users.length === 1){
                const result = await createChat(users[0])
                navigate('/chat/' + result)
            }
            if(users.length > 1){
                try {
                    const data = new FormData();
                    data.append('title', title);
                    for (let i = 0; i < users.length; i++) {
                        data.append('companionsNicknames', users[i]);
                    }
                    const result = await createConversation(data)
                    navigate('/chat/' + result)
                } catch (error) {
                    alert(error?.response?.data?.message)
                }
                
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="container">
            <div className = "section">
                <Menu/>
                <div className = "content"> 
                    
                    <div className="create">
                        <div className="create__header">
                            <div className="create__header--title">
                                {translation("create.title")}
                            </div>
                            <button className="create__header--button back" onClick={ () => {
                                navigate(-1)}
                            }/>
                        </div>
                        <input 
                            id="search" 
                            className="create__search" 
                            type="text"
                            value={search}
                            placeholder = {translation('search')} 
                            onChange={ (e) => setSearch(e.target.value)}
                        />
                        <div className = "create__result">
                            {
                                userData.length > 0
                                ?
                                    userData.map((data, i) => (
                                        <div key = {i} className="object">
                                            <img className="object__photo" src={SERVER_API + data?.photo} alt="" onClick={ () =>  {
                                                navigate('/' + data?.nickname)
                                            }
                                        }/>
                                            <div className="object__content">
                                                <div className="object__content--names">
                                                    {data.firstname} {data.lastname}
                                                </div>
                                                <div className="object__content--status">
                                                    {data.status}
                                                </div>
                                            </div>
                                            <button className={selected ? "object__content--select selected" : "object__content--select"} onClick={() => {
                                                const selected = users.find(nickname => nickname === data?.nickname)
                                                if(selected){
                                                    setUsers(users.filter(nickname =>  nickname !== data?.nickname))
                                                }
                                                if(!selected){
                                                    setUsers([
                                                        ...users,
                                                        data?.nickname
                                                    ])
                                                }
                                            }}/>
                                        </div>
                                    ))
                                :
                                <div className="emptySearch">
                                    {translation("create.empty")}
                                </div>
                            }
                        </div>
                        <form className="create__footer">
                            <input className="create__footer--input" type="text" placeholder={translation('create.input')} onChange={ e  => setTitle(e.target.value)}/>
                            <button className="create__footer--send send" onClick={send}/>
                        </form>
                    </div>
                </div>        
        </div>
    </div>
    )
})
export default Create;