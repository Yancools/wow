import React from "react";
import './Chat.css';


const Chat = () => {
    return (
        <div className="chat">
            <div className="chat__header">
                Заголовок чата
            </div>

            <div className="chat__content"></div>

            <div className="chat__footer">
                <button className="chat__footer--choose"></button>
                <input type="text" className="chat__footer--input" />
                <button className="chat__footer--smile"></button>
                <button className="chat__footer--send"></button>
            </div>
        </div>
    );
}

export default Chat;