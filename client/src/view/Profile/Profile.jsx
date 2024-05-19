import './Profile.css'
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userData } from "../../http/userAPI";
import { observer } from "mobx-react";
import { EDITPROFILE_ROUTE, SERVER_API } from "../../utils/consts";
import Menu from "../../components/Menu/Menu"
import { useLoaderData, useNavigate} from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
const Profile = observer(() => {
    const [translation] = useTranslation();
    const navigate = useNavigate();
    const {userStore} = useContext(UserContext)
    const  data = useLoaderData()
    return (
        <div className="container">
            <div className = "section">
                <Menu/>
                <div className = "content"> 
                    <img className="content__logo" src={SERVER_API + data?.photo} alt=""/>
                    <div className="content__item">
                        {
                            data.nickname === userStore.userData.nickname ? 
                                <button className="content__item--button" onClick={() =>navigate(EDITPROFILE_ROUTE)}>
                                    {translation("profile.edit")}
                                </button>
                            :
                                <button className="content__item--button">
                                    {translation("profile.send")}
                                </button>
                        }
                        <div className="content__item--name">
                            {data?.firstname} {data?.lastname}
                        </div>
                        <div className="content__item--nickname">
                            {'@' + data?.nickname}
                        </div>
                       
                        <div className="content__item--status">
                            {translation("profile.status")} {data?.status}
                        </div>
                        <div className="content__item--gender">
                            {translation("profile.gender")} {data?.gender}
                        </div>
                    </div>  
            </div>        
        </div>
    </div>
    )
})
export const ProfileLoader = async ({params}) => {
    const res = userData(params.nickname)
    const data = await res
    if (data?.response?.status === 400){
        throw new Response('Page is not found...', {status: 404})
    }
    return data
}
export default Profile;