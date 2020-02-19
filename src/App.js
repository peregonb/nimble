import React, {useEffect, useRef, useState} from 'react';
import Item from "./components/Item.jsx";
import Popup from "./components/Popup.jsx";
import playImg from "./assets/img/play.svg";

const App = () => {
    let conditionItems = JSON.parse(localStorage.getItem('elements')).length
        ? JSON.parse(localStorage.getItem('elements')) : [];

    const [items, setItems] = useState(conditionItems);
    const [storedItems, setStoredItems] = useState(conditionItems);
    const [popupVisibility, setPopupVisibility,] = useState(false);
    const [popupValue, setPopupValue] = useState(null);
    const [idToDelete, setIdToDelete] = useState("");
    const input = useRef(null);

    const addItem = (title) => {
        setItems(prev => [
            {
                id: Date.now().toString(),
                title,
                startingTime: Date.now(),
                isRunning: true,
                resumeTime: 0,
                distance: 0
            },
            ...prev
        ]);
    };

    const clickHandler = () => {
        if (input.current.value === "") {
            addItem(new Date().toLocaleString())
        } else {
            addItem(input.current.value);
            input.current.value = "";
        }
    };

    const countdownUpdate = (countDownDate, finalTime) => {
        let now = Date.now(),
            distance = now - countDownDate, fullDistance = distance;

        if (finalTime) {
            fullDistance = finalTime.reduce((a, b) => a + b) + distance
        }
        let hours = Math.floor((fullDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((fullDistance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((fullDistance % (1000 * 60)) / 1000);

        const wrapZeros = num => num < 10 ? "0" + num : num;
        return {
            time: wrapZeros(hours) + ":" + wrapZeros(minutes) + ":" + wrapZeros(seconds),
            distance
        };
    };


    const triggerPopup = (itemId) => {
        setPopupVisibility(true);
        setIdToDelete(itemId);
    };

    const popupClick = (val) => {
        val ? setPopupValue(true) : setPopupValue(false);
        setPopupVisibility(false);
    };

    const playClick = (id) => {
        setItems(prev => prev.map(el => {
            return el.isRunning === true ?
                el.id === id ? {...el, isRunning: false, distance: countdownUpdate(el.startingTime).distance} : el
                : el.id === id ? {
                    ...el,
                    isRunning: true,
                    resumeTime: Date.now(),
                    startingTime: Date.now(),
                    finalTime: el.finalTime.concat([el.distance])
                } : el;
        }))
    };

    useEffect(() => {
        if (popupValue) {
            setItems(prev => prev.filter(el => el.id !== idToDelete));
        }
        setPopupValue(null);
    }, [popupValue]);

    useEffect(() => {
        localStorage.setItem('elements', JSON.stringify(items));
        setStoredItems(JSON.parse(localStorage.getItem('elements')));
        console.table(items)
    }, [items]);


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
                {!storedItems || !storedItems.length ?
                    <span>Чтоб начать введите <br/> название записи и нажмите <img src={playImg} alt="play"/> </span> :
                    storedItems.map(i => <Item key={i.id}
                                               title={i.title}
                                               isRunning={i.isRunning}
                                               countdown={() => countdownUpdate(i.startingTime, i.finalTime)}
                                               triggerPopup={() => triggerPopup(i.id)}
                                               playClick={() => playClick(i.id)}
                    />)
                }
            </div>
            {popupVisibility && <Popup popupClick={popupClick}/>}
        </div>
    )
};

export default App;