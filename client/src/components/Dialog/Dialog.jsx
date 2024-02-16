import './Dialog.css'
const Dialog = () => {
    return (
        <div className="dialog">
            <div className="dialog__icon"></div>
            <div className="dialog__content">
                <div className="dialog__content--title">
                    Здесь будет находиться заголовок беседы
                </div>  
                <div className="dialog__content--text">
                    Здесь будет находиться текст последнего сообщения
                </div>
            </div>
            <div className="dialog__time">
                22:00
            </div>
        </div>
        
    );
}
export default Dialog;