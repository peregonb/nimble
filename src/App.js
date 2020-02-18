import React, {useRef, useState} from 'react';
import Item from "./components/Item.jsx";

const App = () => {
    const [item, setItem] = useState([]);
    const input = useRef(null);

    const addItem = (title) => {
        setItem(prev => [
            {
                id: Date.now().toString(),
                title,
                startingTime: Date.now(),
                isRunning: true
            },
            ...prev
        ]);
    };

    const clickHandler = () => {
        addItem(input.current.value);
    };

    const deleteItem = (itemId) => {
        setItem(prev => prev.filter(el => el.id !== itemId));
    };

    const countdownUpdate = countDownDate => {
        let now = Date.now(), distance = now - countDownDate,
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const wrapZeros = num => {
            return num < 10 ? "0" + num : num;
        };
        return wrapZeros(hours) + ":" + wrapZeros(minutes) + ":" + wrapZeros(seconds);
    };


    return (
        <div className="wrap">
            <div className="headline">tracker</div>
            <form onSubmit={e => {
                addItem;
                e.preventDefault();
            }}>
                <input ref={input} type="text" placeholder="Enter tracker name"/>
                <button onClick={clickHandler} className="icon-play_arrow"/>
            </form>
            <div className="list">
                <div className="list-wrap">
                    {item.map(i => <Item key={i.id}
                                         title={i.title}
                                         countdown={() => countdownUpdate(i.id)}
                                         deleteItem={() => deleteItem(i.id)}/>)}
                </div>
            </div>
        </div>
    )
};

export default App;