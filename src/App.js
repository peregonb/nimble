import React, {useEffect, useRef, useState} from 'react';
import Item from "./components/Item.jsx";
import Popup from "./components/Popup.jsx";
import playImg from "./assets/img/play.svg";
import Form from "./components/Form.jsx";

const App = () => {
    let conditionItems = JSON.parse(localStorage.getItem('elements'))
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
                distance: 0,
                finalTime: [0]
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

    const msToTime = (num) => {
        let hours = Math.floor((num % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((num % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((num % (1000 * 60)) / 1000);

        const wrapZeros = num => num < 10 ? "0" + num : num;
        return wrapZeros(hours) + ":" + wrapZeros(minutes) + ":" + wrapZeros(seconds)
    };

    const countdownUpdate = (countDownDate, finalTime, isRunning) => {
        let now = Date.now(),
            distance = now - countDownDate,
            fullDistance = distance;

        if (finalTime && isRunning) {
            fullDistance = finalTime.reduce((a, b) => a + b) + distance;
        } else if (finalTime && !isRunning) {
            fullDistance = finalTime.reduce((a, b) => a + b)
        }
        return {
            time: msToTime(fullDistance),
            fullDistance
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
                el.id === id ? {
                    ...el,
                    isRunning: false,
                    distance: countdownUpdate(el.startingTime).fullDistance,
                    finalTime: el.finalTime.concat([countdownUpdate(el.startingTime).fullDistance])
                } : el
                : el.id === id ? {
                    ...el,
                    isRunning: true,
                    resumeTime: Date.now(),
                    startingTime: Date.now(),
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
    }, [items]);


    return (
        <div className="wrap">
            <div className="headline">tracker</div>
            <Form addItem={addItem} input={input} clickHandler={clickHandler}/>
            <div className="list">
                {!storedItems || !storedItems.length ?
                    <span>Чтоб начать введите <br/> название записи и нажмите <img src={playImg} alt="play"/> </span> :
                    storedItems.map(i => <Item key={i.id}
                                               title={i.title}
                                               isRunning={i.isRunning}
                                               countdown={() => countdownUpdate(i.startingTime, i.finalTime, i.isRunning)}
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