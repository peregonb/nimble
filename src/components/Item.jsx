import React, {useState} from 'react';
import {useInterval} from "../utils/hooks/useInterval";

const Item = ({countdown, title, triggerPopup, isRunning, playClick}) => {
    const [count, setCount] = useState(countdown);

    useInterval(() => {
        if (isRunning === true) {
            setCount(countdown);
        }
    }, 1000);

    return (
        <div className={isRunning ? "list-element active" : "list-element"}>
            <div className="list-text">{title}</div>
            <div className="list-text">
                {count.time}
            </div>
            <div onClick={playClick}
                 className={isRunning ? "list-play icon-pause_circle_outline" : "list-play icon-play_circle_outline"}/>
            <div onClick={triggerPopup} className={"list-delete icon-remove_circle_outline"}/>
        </div>
    )
};

export default Item;