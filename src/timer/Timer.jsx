import React, { useState, useEffect } from 'react';
import "./timer.css"
const Timer = () => {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(5);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [time, setTime] = useState(300);
  const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    let id;

    if (running && time > 0) {
      id = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setRunning(false);
      clearInterval(intervalId);
    }

    return () => clearInterval(id);
  }, [running, time, intervalId]);

  const startTimer = () => {
    setRunning(true);
  };

  const pauseTimer = () => {
    setRunning(false);
  };

  const stopTimer = () => {
    setRunning(false);
    setInputHours(Math.floor(time / 3600));
    setInputMinutes(Math.floor((time % 3600) / 60));
    setInputSeconds(time % 60);
    setTime(inputHours * 3600 + inputMinutes * 60 + inputSeconds);
  };

  const resetTimer = () => {
    setTime(inputHours * 3600 + inputMinutes * 60 + inputSeconds);
  };

  const handleHoursChange = (event) => {
    const { value } = event.target;
    setInputHours(parseInt(value, 10));
  };

  const handleMinutesChange = (event) => {
    const { value } = event.target;
    setInputMinutes(parseInt(value, 10));
  };

  const handleSecondsChange = (event) => {
    const { value } = event.target;
    setInputSeconds(parseInt(value, 10));
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className='timer'>
      <h1>Timer: {formatTime(time)}</h1>
      <div className="time-input">
        <label>
            <input type="number" value={inputHours} onChange={handleHoursChange} />
        </label>
        <label>:
            <input type="number" value={inputMinutes} onChange={handleMinutesChange} />
        </label>
        <label>:
            <input type="number" value={inputSeconds} onChange={handleSecondsChange} />
        </label>
      </div>
      
      <div className="buttons">
        <button className="btn btn-outline-dark"  onClick={startTimer} disabled={running}>
            Start
        </button>
        <button className="btn btn-outline-dark" onClick={pauseTimer} disabled={!running}>
            Pause
        </button>
        <button className="btn btn-outline-dark" onClick={stopTimer} disabled={!running}>
            Stop
        </button>
        <button className="btn btn-outline-dark" onClick={resetTimer} disabled={running}>
            Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
