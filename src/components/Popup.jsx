import React from 'react';

const Popup = ({popupClick}) => {
    return (
        <div className="popup">
            <div className="popup-modal">
                <div className="popup-text">
                    Вы точно хотите удалить запись?
                </div>
                <div className="popup-buttons">
                    <div onClick={() => popupClick(true)} className="popup-button">Да</div>
                    <div onClick={() => popupClick(false)} className="popup-button">Нет</div>
                </div>
            </div>
            <div onClick={() => popupClick(false)} className="popup-clickCapture"/>
        </div>
    )
};

export default Popup;