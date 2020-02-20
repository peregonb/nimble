import React from 'react';

const Form = ({addItem, input, clickHandler}) => {
    return (
        <form onSubmit={e => {
            addItem;
            e.preventDefault();
        }}>
            <input ref={input} type="text" placeholder="Enter tracker name"/>
            <button onClick={clickHandler} className="icon-play_arrow"/>
        </form>
    )
};

export default Form;