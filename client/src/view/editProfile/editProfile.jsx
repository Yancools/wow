import './editProfile.css'
import Menu from "../../components/Menu/Menu";
import { useContext, useState } from "react";
import { SERVER_API } from "../../utils/consts";
import { UserContext } from "../../providers/UserProvider";
import { useTranslation } from "react-i18next";
import { observer } from 'mobx-react';
import { changeFirstname, changeGender, changeLastname, changeNickname, changePhoto, changeStatus, userData } from '../../http/userAPI';

const EditProfile = observer(() => {
    const [translation] = useTranslation();
    const {userStore} = useContext(UserContext)
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const [photo, setPhoto] = useState('');
    const [nickname, setNickname] = useState('');
    const Send = async () => {
        try {
            if(!firstname && !lastname && !gender && !status && !photo && !nickname){
                alert('Данные для изменения пустые.')
            }
            if(firstname){
                await changeFirstname(firstname)
            }
            if(lastname){
                await changeLastname(lastname)
            }
            if(gender){
                await changeGender(gender)
            }
            if(nickname) {
                await changeNickname(nickname)
            }
            if(status) {
                await changeStatus(status)
            }
            if(photo) {
                const data = new FormData();
                data.append('photo', photo);
                await changePhoto(data)
            }
            const result = await userData(userStore?.userData?.nickname)
            userStore.setUserData(result)
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }
    return(
        <div className="container">
            <div className="section">
                <Menu/>
                <form className="content">
                    <img className="edit__logo" src={SERVER_API + userStore.userData?.photo} alt=""/>
                    <input id="photo" type="file" className="edit__logo--input"
                        onChange={ e => setPhoto(e.target.files[0])}
                    />
                    <label htmlFor="photo" className="edit__logo--label photo" />
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
                </form>
            </div>
        </div>
    )
})
export default EditProfile;