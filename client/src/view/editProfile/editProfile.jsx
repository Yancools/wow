import './editProfile.css'
import Menu from "../../components/Menu/Menu";
import { useContext, useState } from "react";
import { SERVER_API } from "../../utils/consts";
import { UserContext } from "../../providers/UserProvider";
import { useTranslation } from "react-i18next";
import { observer } from 'mobx-react';

const EditProfile = observer(() => {
    const [translation] = useTranslation();
    const {userStore} = useContext(UserContext)
    const [firstname, setFirstname] = useState(userStore.userData.firstname);
    const [lastname, setLastname] = useState(userStore.userData.lastname);
    const [gender, setGender] = useState(userStore.userData.gender);
    const [status, setStatus] = useState(userStore.userData.status);
    const [photo, setPhoto] = useState(userStore.userData.photo);
    const [nickname, setNickname] = useState(userStore.userData.nickname);
    const Send = async () => {
        try {
   
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }
    return(
        <div className="container">
            <div className="section">
                <Menu/>
                <div className="content">
                    <img className="edit__logo" src={SERVER_API + userStore.userData?.photo} alt=""/>
                    <form action="">
                        <input type="file" 
                            onChange={ e => setPhoto(e.target.files[0])}
                        />
                    </form>
                    
                    <div className="edit__row">
                        <div className="edit__row--label">
                            {translation("edit.firstname")}
                        </div>
                        <input className="edit__row--input" type="text" placeholder={userStore.userData?.firstname} onChange={ e  => setFirstname(e.target.value)}/>
                    </div>
                    <div className="edit__row">
                        <div className="edit__row--label">
                            {translation("edit.lastname")}
                        </div>
                        <input className="edit__row--input" type="text" placeholder={userStore.userData?.lastname} onChange={ e  => setLastname(e.target.value)}/>
                    </div>
                    <div className="edit__row">
                        <div className="edit__row--label">
                            {translation("edit.nickname")}
                        </div>
                        <input className="edit__row--input" type="text" placeholder={userStore.userData?.nickname} onChange={ e  => setNickname(e.target.value)}/>
                    </div>
                    <div className="edit__row">
                        <div className="edit__row--label">
                            {translation("edit.status")}
                        </div>
                        <textarea className="edit__row--textarea" type="text" placeholder={userStore.userData?.status} onChange={ e  => setStatus(e.target.value)}/>
                    </div>
                    <div className="edit__row">
                        <div className="edit__row--label">
                            {translation("edit.genderTitle")}
                        </div>
                        <select className="edit__row--select" defaultValue="" onChange={ e  => setGender(e.target.value)}>
                            <option value="" hidden>
                                {translation("edit.gender")}
                            </option>
                            <option value="man">
                                {translation("edit.man")}
                            </option>
                            <option value="woman">
                                {translation("edit.woman")}
                            </option>
                        </select>
                    </div>
                    <button className="edit__button" onClick={Send}>
                        {translation("edit.button")}
                    </button>
                </div>
            </div>
        </div>
    )
})
export default EditProfile;