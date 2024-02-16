import React from "react";
import './Profile.css'

const Profile = ({
    profileActive, 
    changeProfileActive,
    translation
    }) => {
    return (
        <div className = {profileActive ? "profile active" : "profile"} onClick= { () => changeProfileActive(!profileActive)}>
            <div className = {profileActive ? "profile__content active" : "profile__content"} onClick={e => e.stopPropagation()}>
                <div className="profile__content--title">
                    {translation("profile.title")}
                </div>
            </div>
        </div>
    );
}

export default Profile;