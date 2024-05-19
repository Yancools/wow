import React, {  useEffect, useState } from 'react';
import './Search.css'
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { searchUser } from '../../http/userAPI';
import { SERVER_API } from '../../utils/consts';
import { observer } from "mobx-react"

const Search = observer(() => {
    const [translation] = useTranslation();
    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    const debouncedValue = useDebounce(search, 1000)
    const [userData, setUserData] = useState([])
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
    return (
        <div>
            <input 
                id="search" 
                className="search" 
                type="text"
                value={search}
                placeholder = {translation('search')} 
                onChange={ (e) => setSearch(e.target.value)}
            />

            <div 
                className = "result"
                onMouseLeave={() => {
                    setUserData([])
                    setSearch('')
                }}>
                {
                    userData.map((data, i) =>(
                        <div 
                            key = {i} 
                            className="item" 
                            onClick={ () =>  {
                                setUserData([])
                                setSearch('')
                                navigate('/' + data?.nickname)
                            }}
                            
                        >
                            {
                                data?.photo ? 
                                    <img className="item__photo" src={SERVER_API + data?.photo} alt=""/>
                                :
                                    <div className="item__photo" />
                            }
                            <div className="item__content">
                                <div className="item__content--names">
                                    {data.firstname} {data.lastname}
                                </div>
                                <div className="item__content--status">
                                    {data.status}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div> 
    );
})
export default Search;
