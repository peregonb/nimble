import React, {useState} from 'react';
import {useInterval} from "../utils/hooks/useInterval";

const Item = (props) => {
    const [count, setCount] = useState(props.countdown(props.startingTime));

    useInterval(() => {
        setCount(props.countdown(props.startingTime));
    }, 1000);

    return (
        <div className="list-element active">
            <div className="list-text">{props.title}</div>
            <div className="list-text">{count}</div>
            <div className="list-play icon-play_circle_outline"/>
            <div onClick={props.deleteItem} className="list-delete icon-remove_circle_outline"/>
        </div>
    )
};

export default Item;