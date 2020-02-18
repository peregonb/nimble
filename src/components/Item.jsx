import React, {useState} from 'react';
import {useInterval} from "../utils/hooks/useInterval";

const Item = ({countdown, startingTime, title, deleteItem}) => {
    const [count, setCount] = useState(countdown(startingTime));

    useInterval(() => {
        setCount(countdown(startingTime));
    }, 1000);

    return (
        <div className="list-element active">
            <div className="list-text">{title}</div>
            <div className="list-text">{count}</div>
            <div className="list-play icon-play_circle_outline"/>
            <div onClick={deleteItem} className="list-delete icon-remove_circle_outline"/>
        </div>
    )
};

export default Item;