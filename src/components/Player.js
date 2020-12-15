import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause
} from "@fortawesome/free-solid-svg-icons";

const Player = (props) => {
  const { currentSong, setIsPlaying, isPlaying } = props;

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: null
  });
  const audioRef = useRef(null);



  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }

  const timeChangeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration
    });
  };

  const moveHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value
    });
  };

  function updateTimer(time) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
  };

  return (
    <div className='player'>
      <div className='player__control'>
        <p>{updateTimer(songInfo.currentTime)}</p>
        <input
          type='range'
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={moveHandler}
        />
        <p>{updateTimer(songInfo.duration)}</p>
      </div>
      <div className='player__handler'>
        <FontAwesomeIcon
          className='player__back'
          icon={faAngleLeft}
          size='2x'
        />
        <FontAwesomeIcon
          className='player__play'
          icon={isPlaying ? faPause : faPlay} size='2x'
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          className='player__play'
          icon={faAngleRight}
          size='2x'
        />
      </div>
      <audio
        onTimeUpdate={timeChangeHandler}
        onLoadedMetadata={timeChangeHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  )
}

export default Player;